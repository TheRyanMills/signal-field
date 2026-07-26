
# Signal Field

Signal field is a small web app built in 2 hours as a showcase for the Cheil Creative Technology role. The application takes a prompt from the user, uses an external LLM to interpret the prompt into a list of visual parameters, and then displays a particle cloud rendered in WebGL using the returned parameters.

This project was built with React + TypeScript + Vite, Three.js, Cloudflare Workers AI, and Kimi 2.7 Code.

## Local Set-up Instructions

This project uses Cloudflare Workers AI and requires a free Workers AI API Token.

1.  **Grab your API Credentials**: In a browser, sign into your Cloudflare account. From your [Account Home](https://dash.cloudflare.com/), use the side menu to navigate to Build > AI > Workers AI. On this page, click the button labeled 'Rest API' in the top right of the page below the header. You are now on the API Quick Start Page.
    - The first thing you'll need is your Cloudflare Account ID listed here on the API Quick Start page.
    - You will also need to create a Workers AI API Token.
      - Press the 'Create a Workers AI API Token' in the center of the API Quick Start page.
      - In the drawer that appears, verify that the token has Account Read and Account Edit permissions, then press 'Create API Token' in the bottom left.
      - In the next view, copy the newly created API token and paste it somewhere for safe keeping.
2.  **Download the Project**: Get the project to your machine by using the `git clone` command or downloading the project as a .zip file and extracting it into a new directory.
3.  **Add your Credentials**: Once the project has been set up, navigate to `...\signal-field-main\src\util\paste-api-info-here.ts` and open this file in your favorite editor. At the top of the page, assign the variables `ACCOUNT_ID` and `API_TOKEN` to your Account ID and Workers AI API Token respectively.
4.  **Open a Terminal**: Navigate back to the root of the project (...\signal-field-main) and open a terminal.
5.  **Install Dependencies**: In the terminal, type the command `npm run dev`.
6.  **Start Dev Server**: In the terminal, after the previous command finishes executing, type command `npm run dev`.
7.  **Open Web App**: In the terminal, some colored text should appear with a link. Click the link to navigate in the browser to `http://localhost:5176`.

The project should now be ready!

## Prompt Examples

- A calm system gradually becoming unstable
- High energy with tightly controlled movement
- A quiet atmosphere with occasional bursts of activity
- Dense, chaotic, and fast-moving

## Resources

Here are the most notable external references and tools I relied upon:

-  **Ashima Arts**: The 3D Noise Field shader I used was written by Ian McEwan for Ashima Arts. I wrote a simple, custom vertex shader that samples the noise from this field to add turbulence and position displacement to the point cloud.
-  **AI Code Generation**: I made use of Claude to generate the CSS styles used in this project, for fixing a CORS error I encountered while setting up the Cloudflare API, and for completing the Title component fade behavior that I got stuck on right before the two-hour cutoff.
-  **Previous Projects**: I also referenced my own previous work in React TypeScript web apps and Web GLSL for video games.
-  **Cloudflare Docs**: [This page](https://developers.cloudflare.com/workers-ai/get-started/rest-api/) in particular taught me everything I needed to know about setting up the REST request.

## Unfinished Work

Due to time constraints, there are some known behavior quirks and lingering bits of code that go unused in the current version. Here is a brief overview of those details:

-  **Opacity and Layering**: I took a shortcut while setting up my Points geometry to render the cloud as one object instead of rendering each particle individually. I rely on additive blending rather than sorting particles on the z-axis. This means that particles in dense clusters appear as large blobs of white. I began messing with configuring opacity in the shaders, but abandoned the the option quickly when I realized the issue was deeper than I first thought.
-  **Orbit Controls**: I started adding mouse controls to allow the camera to orbit the particle cloud towards the end of the project, but backtracked so I could spend more time testing the API and refining my system prompt.
-  **Data Validation**: I did not spend much time at all testing for error cases, so many errors go uncaught and unhandled when thrown. The errors that are caught are not handled very descriptively, making debugging much more difficult.

## Future Development

Given more time, here are a few things that I would have liked to include in the finished project:

-  **Additional Simulation Properties**: I am very happy with the amount of config options I was able to include, but there are many more simple options which I believe would have a major impact. Some of these include cloud burst behavior, better LLM-parsable gradient control, and cloud shape properties. I also would have loved to build on the 'start'/'target' config I added for rotation speed by having a whole subtree of both 'start' and 'target' properties controlled by one more more global acceleration values so the simulation can evolve more over time.
-  **Simulated Background**: Before I started, I was very eager to have a much more interesting background than the uniform black that I ended up with. I simple 2D shader with controls for animation speed, direction, and angle, and colors would have given the project considerably more depth for creating scenes.
-  **Manual Controls**: Adding an additional UI component for tweaking each of the configuration properties by hand would shine much more light on the breadth of config options available.
-  **Updated CSS Stylings**: The CSS stylings in this projects are almost all generated, which means the page has a very generic brand identity.

## Final Notes

- While I did manage to complete the project within the two-hour limit, I did want to disclose that I did the project set-up and wrote this file outside of that time frame.
- The response I get from Kimi is recorded in the console in case you wanted to peek at the raw data informing the simulation.
- After spending a few minutes during my chat with Alex touching on shader tech, I wanted to make it a personal priority to include some custom shaders in this project! I think the configurable 3D noise field here makes a big impact on the final product.
