import { OrbitingCircles } from "./OrbitingCircles";

export function Frameworks() {
  const skills = [
    "csharp",
    "javascript",
    "java",
    "html5",
    "css3",
    "react",
    "tailwindcss",
    "vitejs",
    "git",
    "github",
    "visualstudiocode",
  ];
  return (
    <div className="relative flex h-[10rem] w-full flex-col items-center justify-center">
      <OrbitingCircles iconSize={40}>
        {skills.map((skill, index) => (
          <Icons key={index} src={`assets/logos/${skill}.svg`} />
        ))}
      </OrbitingCircles>
      <OrbitingCircles iconSize={25} radius={100} reverse speed={2}>
        {skills.reverse().map((skill, index) => (
          <Icons key={index} src={`assets/logos/${skill}.svg`} />
        ))}
      </OrbitingCircles>
    </div>
  );
}

const Icons = ({ src }) => (
  <img src={src} className="rounded-sm hover:scale-110 duration-200" />
);
