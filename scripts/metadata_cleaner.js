
const metadata = $json; 
const aiResponse = $json.output || "";

const cleanString = (val) => {
    if (typeof val !== 'string') return val;
    return val.replace(/[\r\n\t]+/gm, " ").replace(/\s\s+/g, ' ').trim();
};

return [{
    json: {
        
        user_input: cleanString($node["When chat message received"]?.json?.chatInput || ""),
        ai_response: aiResponse.trim(),
        subject: cleanString(metadata.subject || "N/A"),
        topic: cleanString(metadata.topic || "N/A"),
        concept: cleanString(metadata.concept || "N/A"),
        difficulty: cleanString(metadata.difficulty || "N/A")
    }
}];