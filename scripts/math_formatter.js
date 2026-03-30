// FINAL MASTER FORMATTER: The "Human-Readable" UI Layer
const rawResponse = $node["AI Agent1"].json.output || "";

const makeMathBeautiful = (text) => {
    if (typeof text !== 'string') return text;

    return text
        // 1. Remove n8n Metadata Labels
        .replace(/(subject|topic|concept|difficulty)\s*→\s*/gi, '')

        // 2. Fix Fractions: \frac{a}{b} -> (a / b)
        .replace(/\\frac\{([^}]*)\}\{([^}]*)\}/g, '($1 / $2)')

        // 3. Fix Bold Vectors: \mathbf{w} -> w
        .replace(/\\mathbf\{([^}]*)\}/g, '$1')

        // 4. Fix Partial Derivatives: \partial -> ∂
        .replace(/\\partial/g, '∂')

        // 5. Fix Summations and Sigmas: \sum -> Σ, \sigma -> σ
        .replace(/\\sum/g, 'Σ').replace(/\\sigma/g, 'σ')

        // 6. Fix Superscripts & Subscripts (e.g., x^(i), e^-z, b_0)
        .replace(/\^\{?([-+0-9a-z]*)\}?/g, '^$1') 
        .replace(/_\{?([0-9a-z]*)\}?/g, '_$1')

        // 7. Clean up Greek Letters
        .replace(/\\alpha/g, 'α').replace(/\\log/g, 'log')

        // 8. Strip LaTeX structural brackets \[ \] \( \)
        .replace(/\\\[|\\\]|\\\(|\\\)/g, '')
        .replace(/\\left\[|\\right\]|\\left\(|\\right\)/g, '')
        
        // 9. Remove lingering curly braces
        .replace(/[\{\}]/g, '')

        // 10. Final Newline Cleanup
        .replace(/[\r\n]+$/, '') 
        .trim();
};

return [{
    json: {
        output: makeMathBeautiful(rawResponse)
    }
}];