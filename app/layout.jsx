import "@styles/globals.css";

export const metadata = {
  title: "Artify",
  description: "Discover and share Art",
};

const layout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default layout;
