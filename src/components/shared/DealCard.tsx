/**
 * DealCard
 *
 * Shared card component for displaying promotional deals and offers.
 * Use this anywhere we render a list of deal-style listings so that
 * styling and brand presentation stay consistent across the app.
 */
export type DealCardProps = {
  imageSrc: string;
  title: string;
  subtitle?: string;
  originalPrice: string;
  discountedPrice: string;
  savingsPercent: number;
  expiresOn: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
};

export default function DealCard({
  imageSrc,
  title,
  subtitle,
  originalPrice,
  discountedPrice,
  savingsPercent,
  expiresOn,
  ctaLabel = "Book deal",
  onCtaClick,
}: DealCardProps) {
  return (
    <article className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-md flex flex-col h-full">
      <div className="relative">
        <img src={imageSrc} className="w-full h-40 object-cover" />
        <span className="absolute top-3 left-3 bg-[#1a2e4a] text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow">
          Save {savingsPercent}%
        </span>
      </div>

      <div className="p-5 flex flex-col gap-3 flex-1">
        <div>
          <h3 className="text-lg font-bold text-gray-900 leading-tight">
            {title}
          </h3>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-[#1a2e4a]">
            {discountedPrice}
          </span>
          <span className="text-sm text-gray-400 line-through">
            {originalPrice}
          </span>
        </div>

        <p className="text-xs text-gray-500">Expires {expiresOn}</p>

        <button
          type="button"
          onClick={onCtaClick}
          className="mt-auto bg-[#1a2e4a] text-white py-2.5 px-4 rounded-lg font-semibold hover:bg-[#243d60] transition-colors"
        >
          {ctaLabel}
        </button>
      </div>
    </article>
  );
}
