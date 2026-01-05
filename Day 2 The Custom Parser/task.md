### **🎫 Ticket: JS-002**

**Title:** Markdown to HTML Converter
**Priority:** Medium
**Assignee:** You

**Description:**
We need a function that takes a raw string of Markdown text and converts it into valid HTML strings.

**Acceptance Criteria (AC):**

1. **Headers:** Lines starting with `# ` must become `<h1>...</h1>`.
2. **Bold:** Text wrapped in `**` must become `<strong>...</strong>`.
3. **Italic:** Text wrapped in `_` must become `<em>...</em>`.
4. **Links:** Text like `[Google](https://google.com)` must become `<a href="https://google.com">Google</a>`.
5. **Sanitization:** Extra whitespace at the start/end of the string should be removed.

**Example Input:**

```markdown
# Hello World
This is **bold** text and this is a [Link](https://google.com).

```

**Expected Output:**

```html
<h1>Hello World</h1>
<p>This is <strong>bold</strong> text and this is a <a href="https://google.com">Link</a>.</p>

```

*(Note: For simplicity, treat any line that isn't a header as a paragraph `<p>`)*

---

### **🛠️ Starter Kit**

Create folder `day-02-markdown-parser`.

**1. `index.html**`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Day 2: Markdown Parser</title>
    <style>
        body { font-family: sans-serif; display: flex; gap: 20px; padding: 20px; }
        textarea, #preview { width: 50%; height: 80vh; padding: 10px; border: 1px solid #ccc; }
        #preview { background: #f9f9f9; }
    </style>
</head>
<body>
    <textarea id="markdownInput" placeholder="Type markdown here..."># Hello
This is **bold**.</textarea>
    
    <div id="preview"></div>

    <script src="parser.js"></script>
    <script>
        // Simple glue code to connect UI to your logic
        const input = document.getElementById('markdownInput');
        const preview = document.getElementById('preview');

        input.addEventListener('input', () => {
            const html = parseMarkdown(input.value);
            preview.innerHTML = html;
        });
        
        // Initial render
        preview.innerHTML = parseMarkdown(input.value);
    </script>
</body>
</html>

```

**2. `parser.js**` (Your Workspace)

```javascript
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

        // TODO 1: Handle Headers (# Heading)
        // Hint: Check if line starts with '#'
        // Hint: Remove the '#' and wrap the rest in <h1>

        // TODO 2: Handle Bold (**text**)
        // Hint: Use .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        
        // TODO 3: Handle Italic (_text_)
        
        // TODO 4: Handle Links ([text](url))
        // Hint: Regex is /\[(.*?)\]\((.*?)\)/g
        
        // TODO 5: Wrap simple text in <p> if it's not a header
        
        htmlOutput += line + '\n';
    }

    return htmlOutput;
}

```

### **💡 Hints for the Regex (Don't copy paste unless stuck)**

* **Bold:** The regex `/\*\*(.*?)\*\*/g` means:
* `\*\*`: Look for two literal asterisks.
* `(.*?)`: Capture any character inside (group 1).
* `g`: Do it globally (every time it appears).
* Replacement string `'<strong>$1</strong>'` puts the captured group 1 inside the tags.
