import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { TailwindConverter } from "css-to-tailwindcss";

interface HomeProps {
  defaultSettings: DefaultSettings;
}

interface DefaultSettings {
  tailwindConfig: string;
  postCssInput: string;
  tailwindCss: string;
}

const Home: NextPage<HomeProps> = ({ defaultSettings }) => {
  const pureCss = `
  .alert {
    position: relative;
    padding: 1.6rem 4.6rem;
    margin-bottom: 1.6rem;
    border: 1px solid #c53030;
    color: #fff;
    border-radius: 0.2rem;
    width: 100%;
  }
  
  .logo {
    margin-bottom: 1.6rem;
    background: url('logo.svg') no-repeat;
    display: flex;
    justify-content: center;
  }
  
  .button {
    background: #81e6d9;
    padding: 1.6rem 4.6rem;
    letter-spacing: 0.03rem;
    border-radius: 0.2rem;
  }
  
  .button:hover {
    background: #2c7a7b;
  }
  
  @media (min-width: 640px) {
    .button {
      padding: 0.5rem 1rem;
      width: 100%;
    } 
  }
  
  @media (min-width: 1280px) {
    .button {
      padding: 3rem 7rem;
      margin-bottom: 2.4rem;
    } 
  }
  
  .username {
    color: #718096;
    border-color: #bee3f8;
  }
  
  .username:focus {
    border-color: #3182ce;
  }
  
  .username::placeholder {
    color: #cbd5e0;
  }
  
  @media (min-width: 1280px) {
    .username {
      width: 50%;
    } 
  }
  
  .footer {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row-reverse;
    padding: 2.4rem 3rem;
    border-top: 1px solid #fff5f5;
  }
  
  }
  `;

  const converter = new TailwindConverter({
    remInPx: 16, // set null if you don't want to convert rem to pixels
    postCSSPlugins: [require("postcss-nested")], // add any postcss plugins to this array
    tailwindConfig: {
      // your tailwind config here
      content: [],
      theme: {
        extend: {
          colors: {
            "custom-color": {
              100: "#123456",
              200: "hsla(210, 100%, 51.0%, 0.016)",
              300: "#654321",
              gold: "hsl(41, 28.3%, 79.8%)",
              marine: "rgb(4, 55, 242, 0.75)",
            },
          },
          screens: {
            "custom-screen": { min: "768px", max: "1024px" },
          },
        },
        supports: {
          grid: "display: grid",
          flex: "display: flex",
        },
      },
    },
  });

  const [convData, setConvData] = useState("");

  // useEffect(() => {
  //   async function convert() {
  //     // console.log(pureCss);
  //     // console.log(defaultSettings.tailwindCss)
  //     const converted = await cssToTailwind(
  //       pureCss,
  //       defaultSettings.tailwindCss
  //     );
  //     setConvData(converted.tailwind);
  //   }

  //   convert();
  // }, [defaultSettings]);

  const clickHandler = async () => {
    const { convertedRoot, nodes } = await converter.convertCSS(pureCss);
    setConvData(convertedRoot.toString());
  };

  return (
    <>
      <button className="btn btn-blue" onClick={clickHandler}>
        Click to convert tailwind
      </button>
      <div>Here is the tailwind classes: {convData}</div>;
    </>
  );
};

export default Home;

// export async function getStaticProps() {
//   const tailwindConfig = await fs.readFile(
//     path.resolve("./node_modules/tailwindcss/stubs/simpleConfig.stub.js"),
//     "utf-8"
//   );
//   const postCssInput = await fs.readFile(
//     path.resolve("./node_modules/tailwindcss/tailwind.css"),
//     "utf-8"
//   );
//   const config = eval(`const module = {}; ${tailwindConfig}; module.exports;`);
//   const css = await tailwindCss(config, postCssInput);
//   return {
//     props: {
//       defaultSettings: {
//         tailwindConfig,
//         postCssInput,
//         tailwindCss: css,
//       },
//     },
//   };
// }
