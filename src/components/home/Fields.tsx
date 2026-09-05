import { studio } from '@/content/studio';
import { Reveal } from '@/components/motion/Reveal';

/**
 * Skills, tools and languages. Sits at the end of the page, after the work —
 * it is the reference section, not the pitch.
 */
export function Fields() {
  return (
    <section aria-labelledby="fields-heading" className="border-t border-line bg-ink-850">
      <div className="mx-auto max-w-shell px-5 py-14 md:px-8 md:py-16">
        <Reveal>
          <div className="label mb-3">Skills</div>
          <h2
            id="fields-heading"
            className="font-display font-medium leading-tight tracking-display text-fg-hi"
            style={{ fontSize: 'clamp(1.4rem, 2.6vw, 2rem)' }}
          >
            What I work with.
          </h2>
        </Reveal>

        <dl className="mt-9 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {studio.fields.map((f, i) => (
            <Reveal key={f.k} delay={i * 50}>
              <dt className="label border-b border-line pb-2.5">{f.k}</dt>
              <dd>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {f.v.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-sm border border-line bg-ink-900 px-2.5 py-1 text-[12.5px] text-fg-lo"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
