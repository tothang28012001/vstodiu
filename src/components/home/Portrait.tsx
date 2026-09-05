import Image from 'next/image';
import { studio } from '@/content/studio';
import { Host } from './Host';

/**
 * The top of the page: the developer, then a very short line, then the work.
 *
 * The plate renders empty until `studio.portrait.src` is set — an empty frame
 * reads as "photo pending" rather than broken, so the page ships either way.
 */
export function Portrait() {
  const { portrait, host } = studio;

  return (
    <section className="border-b border-line">
      <div className="mx-auto grid max-w-shell gap-8 px-5 py-10 md:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] md:gap-14 md:px-8 md:py-14">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md border border-line bg-ink-850">
          {portrait.src ? (
            <Image
              src={portrait.src}
              alt={portrait.alt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 352px"
              className="object-cover"
            />
          ) : (
            <div className="grid-plate h-full w-full" />
          )}
        </div>

        <div className="flex flex-col justify-center">
          <div className="label mb-5">{studio.name} · {new Date().getFullYear()}</div>

          <h1
            className="font-display font-medium leading-[1.02] tracking-display text-fg-hi"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.6rem)' }}
          >
            {host.name}
          </h1>

          <p className="mt-3 max-w-[34ch] text-[15px] leading-relaxed text-fg-lo">
            Solo game developer, working out of Vietnam under the name Vstodiu.
          </p>

          <div className="mt-8">
            <Host />
          </div>
        </div>
      </div>
    </section>
  );
}
