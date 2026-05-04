"""
Weather AI Agent using LangGraph
"""
import json
from typing import Any, Dict, List
import requests
from tools import get_weather, get_weather_forecast
from prompt import SYSTEM_PROMPT, TOOL_DESCRIPTION


class WeatherAgent:
    """
    AI Agent for weather queries using Ollama (DeepSeek model)
    """
    
    def __init__(self, ollama_base_url: str = "http://localhost:11434"):
        self.ollama_base_url = ollama_base_url
        self.model = "deepseek-r1:1.5b"  # Using DeepSeek 1.5B model
        self.system_prompt = SYSTEM_PROMPT
        self.tool_description = TOOL_DESCRIPTION
        self.conversation_history = []
    
    def _call_ollama(self, messages: List[Dict[str, str]]) -> str:
        """
        Call Ollama API with the given messages.
        
        Args:
            messages: List of message dictionaries with 'role' and 'content'
        
        Returns:
            Response text from the model
        """
        try:
            url = f"{self.ollama_base_url}/api/chat"
            payload = {
                "model": self.model,
                "messages": messages,
                "stream": False,
                "temperature": 0.5,  # Lower temperature for faster, more focused responses
            }
            
            # Increased timeout to 300 seconds (5 minutes)
            response = requests.post(url, json=payload, timeout=300)
            response.raise_for_status()
            
            result = response.json()
            return result.get('message', {}).get('content', 'No response')
        
        except requests.exceptions.Timeout:
            return "The AI is still thinking... Please wait a bit longer or try a simpler question."
        except requests.exceptions.ConnectionError:
            return "Error: Cannot connect to Ollama. Make sure Ollama is running on http://localhost:11434"
        except Exception as e:
            return f"Error: {str(e)}"
    
    def _extract_tool_call(self, response: str) -> Dict[str, Any]:
        """
        Extract tool call from LLM response.
        
        Args:
            response: Response text from LLM
        
        Returns:
            Dictionary with tool name and arguments
        """
        # Look for tool calls in the response
        if "get_weather(" in response:
            # Extract city and date
            try:
                start = response.find("get_weather(") + len("get_weather(")
                end = response.find(")", start)
                args_str = response[start:end]
                args = [arg.strip().strip("'\"") for arg in args_str.split(",")]
                
                return {
                    "tool": "get_weather",
                    "city": args[0] if len(args) > 0 else "current location",
                    "date": args[1] if len(args) > 1 else "today"
                }
            except:
                pass
        
        elif "get_weather_forecast(" in response:
            try:
                start = response.find("get_weather_forecast(") + len("get_weather_forecast(")
                end = response.find(")", start)
                args_str = response[start:end]
                args = [arg.strip().strip("'\"") for arg in args_str.split(",")]
                
                return {
                    "tool": "get_weather_forecast",
                    "city": args[0] if len(args) > 0 else "current location",
                    "days": int(args[1]) if len(args) > 1 else 5
                }
            except:
                pass
        
        return {"tool": None}
    
    def _execute_tool(self, tool_call: Dict[str, Any]) -> str:
        """
        Execute the requested tool.
        
        Args:
            tool_call: Dictionary with tool name and arguments
        
        Returns:
            Tool result as string
        """
        tool_name = tool_call.get("tool")
        
        if tool_name == "get_weather":
            result = get_weather(tool_call.get("city"), tool_call.get("date", "today"))
            return json.dumps(result)
        
        elif tool_name == "get_weather_forecast":
            result = get_weather_forecast(tool_call.get("city"), tool_call.get("days", 5))
            return json.dumps(result)
        
        return "Tool not found"
    
    def process_query(self, user_query: str) -> str:
        """
        Process a user query and return an AI response.
        
        Args:
            user_query: User's question or statement
        
        Returns:
            AI response
        """
        # Add user message to history
        self.conversation_history.append({
            "role": "user",
            "content": user_query
        })
        
        # Prepare messages for LLM
        messages = [
            {
                "role": "system",
                "content": self.system_prompt + "\n\n" + self.tool_description
            }
        ] + self.conversation_history
        
        # Get initial response from LLM
        initial_response = self._call_ollama(messages)
        
        # Check if tool call is needed
        tool_call = self._extract_tool_call(initial_response)
        
        if tool_call.get("tool"):
            # Execute tool
            tool_result = self._execute_tool(tool_call)
            
            # Add tool result to conversation
            messages.append({
                "role": "assistant",
                "content": initial_response
            })
            messages.append({
                "role": "user",
                "content": f"Tool result: {tool_result}"
            })
            
            # Get final response with tool data
            final_response = self._call_ollama(messages)
            response = final_response
        else:
            response = initial_response
        
        # Add assistant response to history
        self.conversation_history.append({
            "role": "assistant",
            "content": response
        })
        
        # Keep conversation history manageable (last 10 messages)
        if len(self.conversation_history) > 10:
            self.conversation_history = self.conversation_history[-10:]
        
        return response
    
    def reset_conversation(self):
        """Reset conversation history"""
        self.conversation_history = []
