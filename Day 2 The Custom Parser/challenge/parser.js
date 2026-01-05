'use strict';

/**
 * Converts Markdown text to HTML
 * @param {string} markdown
 * @returns {string} html
 */
function parseMarkdown(markdown) {
    // 1. Split the text into lines so we can process line-by-line
    const lines = markdown.split('\n');
    
    let htmlOutput = '';

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        
        // Skip empty lines
        if (line === '') continue;
        const isHeader = line.match(/^(#{1,6})\s*(.+)$/)
        // TODO 1: Handle Headers (# Heading)
        if(line.startsWith('#') && /^(#{1,6})\s*(.+)$/.test(line)){
            const match = line.match(/^(#{1,6})\s*(.+)$/);
            if(match){
                const level = match[1].length
                line = `<h${level}>${line.slice(level)}</h${level}>`
            }
        }
            
        // TODO 2: Handle Bold (**text**)
        if(/[**].+[**]/g.test(line)){
            line = line.replace(/\*\*(.+?)\*\*/g , (_,p1)=> `<strong>${p1}</strong>` )
        }
       
        
        // TODO 3: Handle Italic (_text_)
        if(/_(.+)_/g.test(line)){
            line = line.replace(/_(.+?)_/g, (_,p1)=>`<em>${p1}</em>`)
        }
        
        // TODO 4: Handle Links ([text](url))
        if(/\[.*?\]\(https?:\/\/[\w.-]+\.[a-z]{2,6}(\/[\w.-]*)*\)/ig.test(line)){
            line = line.replace(/\[(.*?)\]\((https?:\/\/[\w.-]+\.[a-z]{2,6}(\/[\w.-]*)*)\)/ig, (_,text, url)=> `<a href="${url}">${text}</a>`)
        }
        
        // TODO 5: Wrap simple text in <p> if it's not a header
        if(!isHeader){
            line = `<p>${line}</p>`
        }
        
        htmlOutput += line + '\n';
    }

    return htmlOutput;
}