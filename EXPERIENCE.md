Vibe Coding Experience: Todo List Project with Cursor
1. Tool Selection and Justification
For this assignment, I chose the Cursor editor. During the research phase, I explored tools like Bolt.new and Windsurf; however, Cursor’s similarity to my existing VS Code workflow and its "Composer" feature—which allows for generating multiple files simultaneously—made it the most appealing choice. Instead of a browser-based tool, using a full IDE where files remain under my control on my local machine felt more reliable for project persistence and GitHub integration.

2. Development Process
The development process was fundamentally different from traditional coding; it felt more like "managing" the code rather than manually "writing" it.

Kickoff: I started by using the Ctrl + I (Composer) feature. I gave the AI a single comprehensive prompt requesting a modern Todo List using React and Tailwind CSS, featuring add/delete/edit capabilities, and most importantly, LocalStorage persistence.

Code Generation: Cursor generated the App.jsx, main.jsx, and necessary configuration files in seconds. A setup that would normally take me 30-40 minutes was completed in under a minute.

Interaction: I utilized the Ctrl + L (Chat) panel as an active assistant to understand the logic behind the generated code and to manage package installations.

3. Challenges and Solutions
The most challenging part of the process wasn't the coding itself, but setting up the development environment.

Missing Node.js: Initially, when I ran npm install, I received a "command not found" error. I realized that Node.js was not installed on my machine and had to set it up first.

Directory (Path) Errors: Even after installing Node.js, I encountered npm error code ENOENT and Could not read package.json errors. I discovered the issue was that my terminal was running in the root user directory (Admin) rather than the project folder.

The Solution: When I pasted the error logs into the AI assistant, it acted like a technical support agent. It explained how to use cd commands to navigate into the correct project directory. After correcting the path and restarting Cursor, the project ran smoothly. This proved that the AI is useful not just for writing code, but also for troubleshooting terminal and environment issues.

4. Reflection
The vibe coding experience was surprising. At first, not writing the code line-by-line felt almost like "cheating," but I quickly realized the process shifts your role from a "code laborer" to a "product architect."

Workflow Shift: Instead of struggling with syntax errors, I was able to focus on the logical flow and user experience.

Future Impact: I will definitely use Cursor in future projects, especially for generating initial boilerplate code. However, my experience with the terminal errors taught me a valuable lesson: possessing basic technical knowledge (understanding file systems, package management, etc.) is still critical. The AI isn't magic; it requires a knowledgeable pilot to guide it through technical roadblocks.







