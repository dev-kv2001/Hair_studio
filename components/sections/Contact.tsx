import { Icon } from "@/components/ui/Icon";
import { SampleNote } from "@/components/ui/SampleNote";
import { directionsHref, openingHours, site } from "@/data/site";

const linkClass =
  "inline-flex min-h-11 items-center gap-2 underline decoration-ash underline-offset-[0.3em] transition-colors hover:decoration-charcoal";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="frame py-24 lg:py-40">
      <h2 id="contact-title" className="max-w-[16ch] text-head">
        Visit the studio
      </h2>

      <div className="mt-14 grid gap-16 lg:grid-cols-12 lg:gap-x-8">
        <div className="lg:col-span-5">
          <address className="text-lead not-italic">
            {site.address.street}
            <br />
            {site.address.city} {site.address.postcode}
          </address>
          <ul className="mt-8 flex flex-col">
            <li>
              <a href={site.phone.href} className={linkClass}>
                {site.phone.display}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className={linkClass}>
                {site.email}
              </a>
            </li>
            <li>
              <a href={directionsHref} target="_blank" rel="noopener noreferrer" className={linkClass}>
                Get directions
                <Icon name="external" className="size-4" />
                <span className="sr-only">(opens a map search in a new tab)</span>
              </a>
            </li>
          </ul>
          <SampleNote className="mt-6 max-w-[40ch]">
            Sample contact details. The address, phone number and email are placeholders, so the map search will not
            find a real studio.
          </SampleNote>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <table className="w-full text-left">
            <caption className="pb-6 text-left text-lead">Opening hours</caption>
            <tbody>
              {openingHours.map((row) => (
                <tr key={row.days} className="border-t-2 border-cream">
                  <th scope="row" className="py-4 pr-6 font-normal">
                    {row.days}
                  </th>
                  <td className="py-4 text-right tabular-nums">{row.hours}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <SampleNote className="mt-6">Sample opening hours. Walk-ins welcome when a chair is free.</SampleNote>
        </div>
      </div>
    </section>
  );
}
