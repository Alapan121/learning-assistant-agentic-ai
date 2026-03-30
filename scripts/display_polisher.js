// This cleans the final output for the user's chat window
const rawResponse = $node["AI Agent1"].json.output || "";
const userInput = $node["When chat message received"].json.chatInput;

// Function to remove all trailing newlines and system prefixes for the display
const cleanDisplay = (text) => {
    if (typeof text !== 'string') return text;
    // Removes trailing newlines and internal prefixing like "topic →"
    return text.replace(/topic\s*→\s*/gi, '')
               .replace(/subject\s*→\s*/gi, '')
               .replace(/[\r\n]+$/, '') 
               .trim();
};

return [{
    json: {
        output: cleanDisplay(rawResponse),
        original_query: cleanDisplay(userInput)
    }
}];