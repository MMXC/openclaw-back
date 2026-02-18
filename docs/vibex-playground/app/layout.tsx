import './globals.css';

export const metadata = {
  title: 'VibeX Playground',
  description: 'UI 原型预览与测试',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
