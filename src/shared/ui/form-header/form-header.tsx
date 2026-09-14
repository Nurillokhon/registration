/** @format */

type FormHeaderProps = {
  title: string;
  subtitle: string;
};

/** Forma kartasining markazlashgan sarlavhasi va izohi. */
export function FormHeader({ title, subtitle }: FormHeaderProps) {
  return (
    <header className="text-center">
      <h1 className="text-heading text-[28px] leading-[1.15] font-extrabold tracking-[-0.02em] sm:text-[34px]">
        {title}
      </h1>
      <p className="text-body mt-3 text-[15px] leading-[1.6] wrap-break-word sm:text-[17px]">
        {subtitle}
      </p>
    </header>
  );
}
