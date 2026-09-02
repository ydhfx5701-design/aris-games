import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoData = await readFile(join(process.cwd(), "public/logo/aris-logo.png"));
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#05050a",
          backgroundImage:
            "radial-gradient(circle at 75% 30%, rgba(139,92,246,0.35) 0%, rgba(91,124,250,0.12) 35%, rgba(5,5,10,0) 65%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={640} height={214} alt="ARIS GAMES" />
      </div>
    ),
    { ...size }
  );
}
