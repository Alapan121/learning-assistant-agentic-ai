const rawOutput = $json.output || "";


if (!rawOutput.trim().startsWith('{')) {
    
    return [{
        json: {
            isGeneral: true,
            response: rawOutput,
            
            subject: "General",
            topic: "Conversation",
            concept: "General Knowledge",
            difficulty: "N/A",
            question: rawOutput.substring(0, 50) + "..."
        }
    }];
}


try {
    const cleanedOutput = rawOutput
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
        
    const parsedData = JSON.parse(cleanedOutput);

    return [{
        json: {
            isGeneral: false,
            subject: parsedData.subject || "Unknown",
            topic: parsedData.topic || "Unknown",
            concept: parsedData.concept || "Unknown",
            difficulty: parsedData.difficulty || "Basic",
            question: parsedData.question || "No question provided"
        }
    }];
} catch (error) {
  
    return [{
        json: {
            isGeneral: true,
            response: rawOutput,
            error: "JSON Parsing failed, treating as plain text"
        }
    }];
}