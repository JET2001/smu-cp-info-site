type PageHeadingProps = {
  title: string;
  description: string;
};

export function PageHeading({ title, description }: PageHeadingProps) {
  return (
    <section className="pt-24 pb-16">
      <h1 className="font-heading text-[clamp(48px,6vw,72px)] font-normal tracking-[-0.045em]">
        {title}
      </h1>
      <p className="mt-5.5 max-w-140 text-base leading-[1.6] text-muted">
        {description}
      </p>
    </section>
  );
}
