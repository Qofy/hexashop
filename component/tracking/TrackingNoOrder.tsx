type Props = {
  trackContent: any;
  onTryAgain: () => void;
};

export default function TrackingNoOrder({ trackContent, onTryAgain }: Props) {
  return (
    <div className="text-center py-12">
      <p className="text-gray-600 text-lg mb-4">{trackContent?.noOrderMessage}</p>
      <button
        onClick={onTryAgain}
        className="text-blue-600 hover:text-blue-700 font-semibold underline"
      >
        Try another order ID
      </button>
    </div>
  );
}
