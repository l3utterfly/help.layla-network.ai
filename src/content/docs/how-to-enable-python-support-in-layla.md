---
title: How to enable Python support in Layla
description: Enable Python code execution for Layla Agents, install packages, and build a test agent that returns Python output to the LLM.
category: Guides
order: 90
keywords:
  - Python support
  - Python Interpreter
  - Layla Agents
  - Execute Python
  - pip packages
sourceUrl: https://blog.layla-network.ai/post/how-to-enable-python-support-in-layla
lastUpdated: 2026-03-24
---

Layla Agents can execute Python! This is possible after update v6.7.0: [Layla v6.7.0 has been published](https://www.layla-network.ai/post/layla-v6-7-0-has-been-published).

To enable Python code execution, we need to install a few mini-apps. If you need a refresher, see [How to add features (mini-apps) in Layla](/how-to-add-features-mini-apps-in-layla/).

**Step 1: You need the *Agents* mini-app and the *Python Interpreter* mini-app**

Go to your apps, tap the plus sign, and browse mini-apps. Find the *Agents* and *Python Interpreter* mini-apps. Tap **Download** to add them to Layla.

![Layla Agents mini-app details screen.](/assets/articles/how-to-enable-python-support-in-layla/agents-mini-app.jpg)

![Layla Python Interpreter mini-app details screen.](/assets/articles/how-to-enable-python-support-in-layla/python-interpreter-mini-app.jpg)

**Step 2: Test out the *Python Interpreter***

After you've installed those two mini-apps, let's go to the Python Interpreter mini-app to test it out.

Try executing a simple "Hello Layla" script by tapping the **Run** button at the top-right.

![Python Interpreter running a print Hello Layla script and showing its console output.](/assets/articles/how-to-enable-python-support-in-layla/hello-layla-python.jpg)

You should see the green text "Hello Layla!" in the Console Output below. This confirms that Python is working in Layla!

**Step 3 (optional): Install dependencies**

Python scripts aren't really useful unless you can install libraries and dependencies. Layla allows you to do that!

The **Package Manager** below the output allows you to install Python packages via `pip`, just like you would on a PC.

Let's try installing `requests`, a popular library for making network requests—you will be needing this a lot!

![Python Interpreter Package Manager installing the requests package.](/assets/articles/how-to-enable-python-support-in-layla/install-python-package.jpg)

Type `requests` in the Package Manager input and tap **Add**.

Tip: This input works just like a command line. You can add arguments such as `--upgrade` to replace already installed packages. You can fix a version by using `[package name]==[version]`. You can even install multiple packages by simply typing them with a space between their names!

Afterwards, you should see green text detailing the install progress.

**Step 3: Create a test agent**

Python scripting becomes a lot more useful if Agents can execute scripts, and Layla supports that.

In this article, we will create a simple test agent that prints something to be sent to the LLM. In future articles, we will go over creating more complicated agents.

Go back to the Agents mini-app. The easiest way is to duplicate an existing agent. Let's do that.

Edit the name and description to something you can remember.

![Layla Agents list with a duplicated Test Python code agent.](/assets/articles/how-to-enable-python-support-in-layla/duplicate-agent.jpg)

Edit this new agent:

![Layla Edit Agent screen with Python configured as a phrase trigger.](/assets/articles/how-to-enable-python-support-in-layla/python-agent-trigger.jpg)

For now, we will just use the phrase **Python**. This means whenever you mention "Python" in your messages to Layla, this agent will be triggered. Obviously, more complex triggers are needed later for more complex agents.

Add the **Execute Python code** tool:

![Layla Edit Agent screen listing tools, including Execute Python code.](/assets/articles/how-to-enable-python-support-in-layla/add-execute-python-tool.jpg)

In the Python code tool, you are able to edit the script to execute and add any dependencies your code needs. For now, a simple `print` will do:

![Layla Execute Python code tool configured with a simple print statement.](/assets/articles/how-to-enable-python-support-in-layla/configure-python-tool.jpg)

Since the `print` code requires no dependencies, we will leave that section blank.

That's it! Your agent is created.

Now, go back and start a chat with Layla. Make sure your agent is enabled—you can check that the toggle is on in the Agents list.

When you mention "Python", the code will execute and the output is sent to the LLM!

![Layla chat reporting that it finished executing Python code.](/assets/articles/how-to-enable-python-support-in-layla/python-agent-execution.jpg)

![Layla chat responding with Hello from Python code.](/assets/articles/how-to-enable-python-support-in-layla/python-agent-response.jpg)
