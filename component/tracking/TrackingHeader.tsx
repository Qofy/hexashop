type Props = {
  trackContent: any;
};

export default function TrackingHeader({ trackContent }: Props) {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
        {trackContent?.title}
      </h1>
      <p className="text-center text-gray-600 mb-12">
        Enter your order ID to track your package in real-time
      </p>
    </div>
  );
}
