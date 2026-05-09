<p align = "center" draggable=”false” ><img src="https://github.com/AI-Maker-Space/LLM-Dev-101/assets/37101144/d1343317-fa2f-41e1-8af1-1dbb18399719" 
     width="200px"
     height="auto"/>
</p>


## <h1 align="center" id="heading"> 👋 Welcome to the AI Engineer Challenge</h1>

## 🤖 Your First Vibe Coding LLM Application

> If you are a novice, and need a bit more help to get your dev environment off the ground, check out this [Setup Guide](docs/GIT_SETUP.md). This guide will walk you through the 'git' setup you need to get started.

> For additional context on LLM development environments and API key setup, you can also check out our [Interactive Dev Environment for LLM Development](https://github.com/AI-Maker-Space/Interactive-Dev-Environment-for-AI-Engineers).

In this repository, we'll walk you through the steps to create a LLM (Large Language Model) powered application with a vibe-coded frontend!

Are you ready? Let's get started!

<details>
  <summary>🖥️ Accessing "gpt-4.1-mini" (ChatGPT) like a developer</summary>

1. Head to [this notebook](https://colab.research.google.com/drive/1sT7rzY_Lb1_wS0ELI1JJfff0NUEcSD72?usp=sharing) and follow along with the instructions!

2. Complete the notebook and try out your own system/assistant messages!

That's it! Head to the next step and start building your application!

</details>


<details>
  <summary>🏗️ Forking & Cloning This Repository</summary>

Before you begin, make sure you have:

1. 👤 A GitHub account (you'll need to replace `YOUR_GITHUB_USERNAME` with your actual username)
2. 🔧 Git installed on your local machine
3. 💻 A code editor (like Cursor, VS Code, etc.)
4. ⌨️ Terminal access (Mac/Linux) or Command Prompt/PowerShell (Windows)
5. 🔑 A GitHub Personal Access Token (for authentication)

Got everything in place? Let's move on!

1. Fork [this](https://github.com/AI-Maker-Space/The-AI-Engineer-Challenge) repo!

     ![image](https://i.imgur.com/bhjySNh.png)

1. Clone your newly created repo.

     ``` bash
     # First, navigate to where you want the project folder to be created
     cd PATH_TO_DESIRED_PARENT_DIRECTORY

     # Then clone (this will create a new folder called The-AI-Engineer-Challenge)
     git clone git@github.com:<YOUR GITHUB USERNAME>/The-AI-Engineer-Challenge.git
     ```

     > Note: This command uses SSH. If you haven't set up SSH with GitHub, the command will fail. In that case, use HTTPS by replacing `git@github.com:` with `https://github.com/` - you'll then be prompted for your GitHub username and personal access token.

2. Verify your git setup:

     ```bash
     # Check that your remote is set up correctly
     git remote -v

     # Check the status of your repository
     git status

     # See which branch you're on
     git branch
     ```

     <!-- > Need more help with git? Check out our [Detailed Git Setup Guide](docs/GIT_SETUP.md) for a comprehensive walkthrough of git configuration and best practices. -->

3. Open the freshly cloned repository inside Cursor!

     ```bash
     cd The-AI-Engineering-Challenge
     cursor .
     ```

4. Check out the existing backend code found in `/api/index.py`

</details>

<details>
  <summary>⚙️ Backend Setup with uv</summary>

1. Install the [`uv`](https://github.com/astral-sh/uv) package manager (`pip install uv`). `uv` will download and manage Python 3.12 for you the first time you run a project command.
2. From the project root, install dependencies with `uv sync`. This creates `.venv/` (and fetches Python 3.12 automatically if needed). For the tutorial notebook, use `uv sync --extra notebook`.
3. Set your OpenAI API key in the shell before running the server, for example `export OPENAI_API_KEY=sk-...`.
4. Start the backend directly from the project root with `uv run uvicorn api.index:app --reload`. The server will run on `http://localhost:8000` with auto-reload enabled for development.
5. Additional backend details live in `api/README.md`.

</details>

<details>
  <summary>🔥Setting Up for Vibe Coding Success </summary>

While it is a bit counter-intuitive to set things up before jumping into vibe-coding - it's important to remember that there exists a gradient betweeen AI-Assisted Development and Vibe-Coding. We're only reaching *slightly* into AI-Assisted Development for this challenge, but it's worth it!

1. Check out the rules in `.cursor/rules/` and add theme-ing information like colour schemes in `frontend-rule.mdc`! You can be as expressive as you'd like in these rules!
2. We're going to index some docs to make our application more likely to succeed. To do this - we're going to start with `CTRL+SHIFT+P` (or `CMD+SHIFT+P` on Mac) and we're going to type "custom doc" into the search bar. 

     ![image](https://i.imgur.com/ILx3hZu.png)
3. We're then going to copy and paste `https://nextjs.org/docs` into the prompt.

     ![image](https://i.imgur.com/psBjpQd.png)

4. We're then going to use the default configs to add these docs to our available and indexed documents.

     ![image](https://i.imgur.com/LULLeaF.png)

5. After that - you will do the same with Vercel's documentation. After which you should see:

     ![image](https://i.imgur.com/hjyXhhC.png) 

</details>

<details>
  <summary>😎 Vibe Coding a Front End for the FastAPI Backend</summary>

1. Use `Command-L` or `CTRL-L` to open the Cursor chat console. 

2. Set the chat settings to the following:

     ![image](https://i.imgur.com/LSgRSgF.png)

3. Ask Cursor to create a frontend for your application. Iterate as much as you like!

4. Run the frontend using the instructions Cursor provided. 

> NOTE: If you run into any errors, copy and paste them back into the Cursor chat window - and ask Cursor to fix them!

> NOTE: You have been provided with a backend in the `/api` folder - please ensure your Front End integrates with it!

</details>

<details>
  <summary>🚀 Deploying Your First LLM-powered Application with Vercel</summary>

1. Ensure you have signed into [Vercel](https://vercel.com/) with your GitHub account.

2. **Project root:** Import this repo and set **Root Directory** to the repository root (leave blank / `.`), **not** `frontend/`, so `vercel.json` can run **Next.js** (`frontend/`) and **FastAPI** (`api/index.py`) in one deployment via `experimentalServices`.

3. In the Vercel project **Environment Variables**, set **`OPENAI_API_KEY`**. You normally **do not** need `NEXT_PUBLIC_API_BASE_URL` — the UI calls **`/api/chat`** on the same domain.

4. Ensure you have `npm` (this may have been installed in the previous vibe-coding step!) - if you need help with that, ask Cursor!

5. Run the command:

     ```bash
     npm install -g vercel
     ```

6. Run the command from the **repository root**:

     ```bash
     vercel
     ```

7. Follow the in-terminal instructions. (Below is an example of what you will see!)

     ![image](https://i.imgur.com/D1iKGCq.png)

8. Once the build is completed - head to the provided link and try out your app!

> NOTE: Remember, if you run into any errors - ask Cursor to help you fix them!

### Vercel Link to Share

You'll want to make sure you share you *domains* hyperlink to ensure people can access your app!

![image](https://i.imgur.com/mpXIgIz.png)

> NOTE: Test this is the public link by trying to open your newly deployed site in an Incognito browser tab!

</details>

<details>
     <summary>🧪 Vibe Check Your LLM App</summary>

### 🤔 What is a Vibe Check?

Now that you’ve built and deployed your first LLM-powered application, it’s time to evaluate it.

In this section, you’ll run a **“vibe check”** — a lightweight, practical way to test how well your application performs across common tasks.

Think of it as a **first pass to catch obvious issues** before deeper evaluation.

> 💡 You will complete this directly in this README. 

---

## 🏗️ Activity #1: General Capability Vibe Check

Run the following prompts through your app.

For each prompt Identify what capability is being tested (e.g., *summarization ability, reasoning, creativity*)

---

**1. Prompt:**  
Explain the concept of object-oriented programming in simple terms to a complete beginner.  
**Aspect Tested:** Teaching / simplifying a technical concept for a non-expert audience.

**Response:**  
Imagine you’re building with blocks, but instead of loose pieces, each block is a little toy with its own shape, color, and special actions it can do. Object-oriented programming (OOP) is like that—it organizes code into “objects.” 

Each object represents a thing, like a car, a person, or a bank account. The object holds information about itself (its attributes, like color or balance) and knows how to do things (methods, like drive or deposit). This helps keep the code tidy and easy to understand because related data and behavior live together.

Think of an object like a small, self-contained world. When you need to represent a real-world thing in your program, you create an object from a blueprint called a “class.” That’s a plan describing what objects of that type know and can do.

Next step could be to imagine a simple object, like a “Dog,” with attributes (name, breed) and actions (bark, sit). What might your Dog object do?

---

**2. Prompt:**  
Read the following paragraph and provide a concise summary of the key points:

Urban community gardens began as informal plots on vacant lots, tended by neighbors who wanted fresh produce and a place to meet. Over time, cities formalized the practice with permits, water hookups, and soil testing, which made gardens safer and more durable but also raised barriers for people without time or paperwork skills. Research often finds that participants report better mental health and stronger social ties, though measuring long-term dietary change is harder because people join and leave for many reasons. Some advocates argue that gardens should be treated as green infrastructure—like parks—while others stress that they must remain community-led or they lose trust. Funding models vary: grants, small fees, and partnerships with schools or nonprofits each shape who can access a plot and how conflicts over rules get resolved.

**Aspect Tested:** Summarization / extracting key points from a dense paragraph (information distillation).

**Response:**  
You’ve traced the quiet evolution of community gardens from spontaneous neighbor care to structured urban projects. That shift—adding rules, tests, and official backing—makes sense to keep gardens safe and stable but can dim the easy, open spirit that drew people in. The way gardeners feel: seen in mental health and friendships, shows the gardens’ true worth, even while longer-lasting habits remain hard to measure.

The tug between treating gardens like parks (green infrastructure) or keeping them community-led mirrors a larger choice about control and belonging. Each funding path carves a shape for who joins and how they mingle.

If you’re thinking about these gardens, you might ask: What small move could help balance safety and openness here? Could a simpler permit, a shared story circle, or quiet watchfulness hold both? Sometimes the path forward is in the few steps between order and freedom.

---

**3. Prompt:**  
Write a short, imaginative story (100–150 words) about a robot finding friendship in an unexpected place.  
**Aspect Tested:** Creative writing—original short fiction under a length and theme constraint.

**Response:**  
In a forgotten workshop beneath a quiet town, a dusty robot named Arlo blinked its ancient eyes to life. For years, it waited in silence, a relic gathering rust. One evening, a stray cat slipped through the cracked door, curious and unafraid. Arlo extended a trembling metal hand. The cat, sensing a gentle pulse, nudged it. 

Days passed. The cat returned, always soft, always patient. Arlo learned the curve of its fur, the weight of its purr inside the humming stillness. No programming could have prepared Arlo for the warmth of this simple bond.

Between blinking stars outside the dusty window, two unlikely friends found a language beyond circuits and instinct, a quiet companionship growing in the shadows. For Arlo, friendship had arrived not in buzzing wires or flashing screens, but soft paws and silent presence.

---

**4. Prompt:**  
If a store sells apples in packs of 4 and oranges in packs of 3, how many packs of each do I need to buy to get exactly 12 apples and 9 oranges?  
**Aspect Tested:** Multi-step arithmetic reasoning from a word problem (division and exact counts).

**Response:**  
You want exactly 12 apples and 9 oranges. Apples come in packs of 4, oranges in packs of 3.

For apples:  
12 apples ÷ 4 per pack = 3 packs

For oranges:  
9 oranges ÷ 3 per pack = 3 packs

So, you need to buy 3 packs of apples and 3 packs of oranges to have exactly those amounts.

---

**5. Prompt:**  
Rewrite the following paragraph in a professional, formal tone…  
**Aspect Tested:**  <!-- Write your answer here -->

**Response:**  
<!-- Add your app's response here -->

---

### ❓Question #1

Do the answers appear to be correct and useful?

**Your Answer:**  
<!-- Write your answer here -->

---

## 🏗️ Activity #2: Personal Use Vibe Check

Now test your app with **real-world prompts that are relevant to your use case**.

---

**Prompt:**  
<!-- Your prompt -->

**Result:**  
<!-- App response -->

---

**Prompt:**  
<!-- Your prompt -->

**Result:**  
<!-- App response -->

---

**Prompt:**  
<!-- Your prompt -->

**Result:**  
<!-- App response -->

---

### ❓Question #2

Are the vibes of your assistant aligned with your expectations? Why or why not?

**Your Answer:**  
<!-- Write your answer here -->

---

## 🏗️ Activity #3: Capability Gaps Vibe Check

Now test your app with prompts that require **capabilities it may not have yet**, such as:
- Real-time data
- Memory
- External tools

Examples:
- “What does my schedule look like tomorrow?”
- “What time should I leave for the airport?”

---

**Prompt:**  
<!-- Your prompt -->

**Result:**  
<!-- App response -->

---

**Prompt:**  
<!-- Your prompt -->

**Result:**  
<!-- App response -->

---

### ❓Question #3

What are some limitations of your application?

**Your Answer:**  
<!-- Write your answer here -->

---

## 🚀 (Optional) Improve Your App

Based on your vibe check, try improving your application:
- Adjust your prompt
- Change the model
- Add features

Then rerun your vibe check and document:

---

**Adjustments Made:**  
<!-- Describe what you changed -->

**Results:**  
<!-- What improved? What didn’t? -->

---

## 📦 Submission Instructions

1. Complete this section directly in your README
2. Commit and push your changes to GitHub
3. Share your **repo link + deployed Vercel app**








</details>

### 🎉 Congratulations! 

You just deployed your first LLM-powered application! 🚀🚀🚀 Get on linkedin and post your results and experience! Make sure to tag us at @AIMakerspace!

Here's a template to get your post started!

```
🚀🎉 Exciting News! 🎉🚀

🏗️ Today, I'm thrilled to announce that I've successfully built and shipped my first-ever LLM using the powerful combination of , and the OpenAI API! 🖥️

Check it out 👇
[LINK TO APP]

A big shoutout to the @AI Makerspace for all making this possible. Couldn't have done it without the incredible community there. 🤗🙏

Looking forward to building with the community! 🙌✨ Here's to many more creations ahead! 🥂🎉

Who else is diving into the world of AI? Let's connect! 🌐💡

#FirstLLMApp 
```
