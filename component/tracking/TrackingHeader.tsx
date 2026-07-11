type Props = {
  trackContent: any;
};

export default function TrackingHeader({ trackContent }: Props) {
  return (
    <div className="px-4 md:px-6">
      <h1 className="text-2xl md:text-4xl font-bold text-center text-gray-900 mb-2 md:mb-4">
        {trackContent?.title}
      </h1>
      <p className="text-center text-sm md:text-base text-gray-600 mb-6 md:mb-12">
        Enter your order ID to track your package in real-time
      </p>
    </div>
  );
}
