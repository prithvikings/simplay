import {
  FacebookIcon,
  GithubIcon,
  Grid2X2Plus,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react";

export function MinimalFooter() {
  const year = new Date().getFullYear();

  const company = [
    {
      title: "About Us",
      href: "#",
    },
    {
      title: "Careers",
      href: "#",
    },
    {
      title: "Brand assets",
      href: "#",
    },
    {
      title: "Privacy Policy",
      href: "#",
    },
    {
      title: "Terms of Service",
      href: "#",
    },
  ];

  const resources = [
    {
      title: "Blog",
      href: "#",
    },
    {
      title: "Help Center",
      href: "#",
    },
    {
      title: "Contact Support",
      href: "#",
    },
    {
      title: "Community",
      href: "#",
    },
    {
      title: "Security",
      href: "#",
    },
  ];

  const socialLinks = [
    {
      icon: <FacebookIcon className="size-4" />,
      link: "#",
    },
    {
      icon: <GithubIcon className="size-4" />,
      link: "#",
    },
    {
      icon: <InstagramIcon className="size-4" />,
      link: "#",
    },
    {
      icon: <LinkedinIcon className="size-4" />,
      link: "#",
    },
    {
      icon: <TwitterIcon className="size-4" />,
      link: "#",
    },
    {
      icon: <YoutubeIcon className="size-4" />,
      link: "#",
    },
  ];
  return (
    <footer className="relative">
      <div className="mx-auto max-w-5xl md:border-x">
        <div className="bg-border absolute inset-x-0 h-px w-full" />
        <div className="grid max-w-4xl grid-cols-6 gap-6 p-4">
          <div className="col-span-6 flex flex-col gap-5 md:col-span-4">
            <a href="#" className="w-max opacity-25 logo group cursor-pointer">
              <svg
                width="32"
                height="32"
                viewBox="0 0 96 96"
                xmlns="http://www.w3.org/2000/svg"
                className="text-zinc-900 dark:text-zinc-50 transition-transform duration-300 group-hover:scale-[1.06]"
              >
                <rect
                  x="16"
                  y="16"
                  width="64"
                  height="12"
                  rx="6"
                  fill="currentColor"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
                <rect
                  x="28"
                  y="32"
                  width="64"
                  height="12"
                  rx="6"
                  fill="currentColor"
                  className="transition-transform duration-300 delay-75 group-hover:-translate-x-1"
                />
                <rect
                  x="16"
                  y="48"
                  width="64"
                  height="12"
                  rx="6"
                  fill="currentColor"
                  className="transition-transform duration-300 delay-150 group-hover:translate-x-1"
                />
                <rect
                  x="28"
                  y="64"
                  width="64"
                  height="12"
                  rx="6"
                  fill="currentColor"
                  className="transition-transform duration-300 delay-200 group-hover:-translate-x-1"
                />
              </svg>
            </a>
            <p className="text-muted-foreground max-w-sm font-mono text-sm text-balance">
              Turn YouTube playlists into distraction-free courses.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((item, i) => (
                <a
                  key={i}
                  className="hover:bg-accent rounded-md border p-1.5"
                  target="_blank"
                  href={item.link}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
          <div className="col-span-3 w-full md:col-span-1">
            <span className="text-muted-foreground mb-1 text-xs">
              Resources
            </span>
            <div className="flex flex-col gap-1">
              {resources.map(({ href, title }, i) => (
                <a
                  key={i}
                  className={`w-max py-1 text-sm duration-200 hover:underline`}
                  href={href}
                >
                  {title}
                </a>
              ))}
            </div>
          </div>
          <div className="col-span-3 w-full md:col-span-1">
            <span className="text-muted-foreground mb-1 text-xs">Company</span>
            <div className="flex flex-col gap-1">
              {company.map(({ href, title }, i) => (
                <a
                  key={i}
                  className={`w-max py-1 text-sm duration-200 hover:underline`}
                  href={href}
                >
                  {title}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-border absolute inset-x-0 h-px w-full" />
        <div className="flex max-w-4xl flex-col justify-between gap-2 pt-2 pb-5">
          <p className="text-muted-foreground text-center font-thin">
            © {year} Simplay. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
