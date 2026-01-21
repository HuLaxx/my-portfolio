<div align="center">
  <img src="public/generated/banner.svg" width="100%" alt="Rahul Khanke Portfolio Banner" />
</div>

<div align="center">
  <br />
  <a href="https://github.com/HuLaxx">
    <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/>
  </a>
  <a href="https://linkedin.com/in/rahul-khanke">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/>
  </a>
  <a href="mailto:rahulkhanke786@gmail.com">
    <img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email"/>
  </a>
  <br /><br />
</div>

---

<div align="center">
  <h3>⚡ Engineering Premium Digital Experiences</h3>
  <p>Data Scientist • AI Engineer • Full Stack Developer</p>
</div>

<table>
  <tr>
    <td width="60%">
      <h2>🧑‍💻 About Me</h2>
      <p>
        I am a <b>Data Scientist</b> and <b>Full Stack Engineer</b> obsessed with the intersection of Design and AI. 
        Currently pursuing my <b>MSc in Data Science</b> at the <b>University of Glasgow</b>.
      </p>
      <p>
        My work bridges the gap between robust backend systems (Python, AWS, RAG) and immersive frontend experiences (Next.js, Three.js).
        I don't just build apps; I craft <i>intelligent</i> interfaces that feel alive.
      </p>
      <br />
      <h3>🚀 Core Tech</h3>
      <p>
        <img src="https://img.shields.io/badge/Next.js_15-000000?style=flat-square&logo=next.js&logoColor=white" />
        <img src="https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB" />
        <img src="https://img.shields.io/badge/Three.js-000000?style=flat-square&logo=three.js&logoColor=white" />
        <img src="https://img.shields.io/badge/Vercel_AI_SDK-000000?style=flat-square&logo=vercel&logoColor=white" />
        <br />
        <img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white" />
        <img src="https://img.shields.io/badge/PyTorch-EE4C2C?style=flat-square&logo=pytorch&logoColor=white" />
        <img src="https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white" />
        <img src="https://img.shields.io/badge/Tailwind_CSS_4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" />
      </p>
    </td>
    <td width="40%" align="center">
      <img src="public/me.png" width="200" style="border-radius: 50%; border: 4px solid #6366f1;" alt="Rahul Khanke" />
      <br />
      <br />
      <img src="https://readme-typing-svg.herokuapp.com?font=Inter&weight=600&size=22&pause=1000&color=6366F1&center=true&vCenter=true&width=250&lines=Data+Scientist;AI+Engineer;Creative+Dev;Next.js+Expert" alt="Typing SVG" />
    </td>
  </tr>
</table>

## 🧪 Featured Projects

<table width="100%">
  <tr>
    <td width="50%">
      <h3 align="center">Vogue Scandinavia <br/> <sub><i>Immersive WebGL Runway</i></sub></h3>
      <p align="center">
        A bespoke WebGL runway where editors scrub across time, reveal look layers, and trigger AI commentary.
      </p>
      <p align="center">
        <img src="https://img.shields.io/badge/Three.js-black?style=flat-square&logo=three.js" />
        <img src="https://img.shields.io/badge/Next.js-black?style=flat-square&logo=next.js" />
        <img src="https://img.shields.io/badge/RAG_AI-blue?style=flat-square" />
      </p>
    </td>
    <td width="50%">
      <h3 align="center">SpaceX Starship <br/> <sub><i>Mission Control Sim</i></sub></h3>
      <p align="center">
        Browser-based mission control with real telemetry, GPU smoke sims, and AI-guided mission status.
      </p>
      <p align="center">
        <img src="https://img.shields.io/badge/WebGL-black?style=flat-square&logo=webgl" />
        <img src="https://img.shields.io/badge/Python-blue?style=flat-square&logo=python" />
        <img src="https://img.shields.io/badge/LangChain-green?style=flat-square" />
      </p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3 align="center">Nike Lab <br/> <sub><i>Kinetic Commerce</i></sub></h3>
      <p align="center">
        Motion-reactive commerce stack merging product stories, sensor inputs, and AI stylists.
      </p>
      <p align="center">
        <img src="https://img.shields.io/badge/RSC-black?style=flat-square" />
        <img src="https://img.shields.io/badge/TensorFlow-orange?style=flat-square&logo=tensorflow" />
      </p>
    </td>
    <td width="50%">
       <div align="center">
         <h3>More Projects...</h3>
         <a href="https://github.com/HuLaxx">View Full Portfolio</a>
       </div>
    </td>
  </tr>
</table>


## 🏗️ System Architecture

<div align="center">
  <br />
  <pre>
  mermaid
  graph TD
    A[User Client] -->|Https/Edge| B[Next.js 15 Edge Runtime]
    B -->|RSC| C[React Server Components]
    B -->|API| D[Vercel AI SDK]
    
    subgraph "Frontend Layer"
      C --> E[Three.js Canvas]
      C --> F[Tailwind 4 + Framer Motion]
    end
    
    subgraph "Data & Logic"
      D -->|Inference| G[Gemini 2.5 Flash]
      C -->|Content| H[Sanity CMS]
    end
    
    subgraph "Performance"
      B --> I[Vercel Analytics]
      B --> J[Speed Insights]
    end
    
    E -.->|Interactive| A
  </pre>
  <br />
</div>

## � Project Structure

```bash
📦 my-portfolio
 ┣ 📂 public
 ┃ ┣ 📂 audio
 ┃ ┗ 📂 generated    # Generated assets/SVGs
 ┣ 📂 src
 ┃ ┣ 📂 app          # Next.js App Router
 ┃ ┣ 📂 components   # Reusable UI Components
 ┃ ┣ 📂 data         # Fallback data & content
 ┃ ┣ 📂 lib          # Utilities & CMS clients
 ┃ ┗ 📂 utils        # Helper functions
 ┣ 📜 next.config.mjs
 ┗ 📜 tailwind.config.ts
```

## �🛠️ Installation & Setup


```bash
# Clone the repository
git clone https://github.com/HuLaxx/my-portfolio.git

# Install dependencies (Next.js 15 + React 19)
npm install

# Run the development server
npm run dev
```

## 📈 GitHub Stats

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=HuLaxx&show_icons=true&theme=tokyonight&hide_border=true&bg_color=0D1117&title_color=6366F1&icon_color=8B5CF6" />
  <img src="https://github-readme-streak-stats.herokuapp.com/?user=HuLaxx&theme=tokyonight&hide_border=true&background=0D1117&ring=6366F1&fire=8B5CF6" />
</div>

<br />

<div align="center">
  <sub>Designed & Built by Rahul Khanke using <b>Next.js 15</b> and <b>Vercel AI SDK</b>.</sub>
</div>
