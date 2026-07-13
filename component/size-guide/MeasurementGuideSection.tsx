import { Ruler } from 'lucide-react';

export default function MeasurementGuideSection() {
  const steps = [
    {
      title: 'Bust/Chest',
      description: 'Measure around the fullest part of your bust or chest. Keep the tape loose enough to fit a finger between the tape and your body.',
    },
    {
      title: 'Waist',
      description: 'Measure around your natural waist (smallest part of your torso). Stand straight and breathe normally while measuring.',
    },
    {
      title: 'Hips',
      description: 'Measure around the fullest part of your hips and bottom. Keep your feet together and the tape parallel to the ground.',
    },
    {
      title: 'Shoulder Width',
      description: 'Measure from the tip of one shoulder to the tip of the other shoulder across the back. Keep the tape straight and snug.',
    },
    {
      title: 'Length/Inseam',
      description: 'For tops, measure from shoulder to hem. For bottoms, measure from the waistband to the ankle, or use your inseam measurement.',
    },
    {
      title: 'Sleeve Length',
      description: 'Measure from the center back neck, across the shoulder, and down to the wrist. Bend your elbow slightly for accuracy.',
    },
  ];

  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-8 flex items-center gap-3">
        <Ruler size={28} className="text-purple-600" />
        How to Measure
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {steps.map((step, index) => (
          <div key={`${step.title}-${index}`} className="bg-white rounded-lg shadow-md p-5 md:p-6 border-l-4 border-purple-600">
            <div className="flex items-start gap-3 md:gap-4">
              <div className="bg-purple-100 text-purple-600 rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center font-bold flex-shrink-0 text-sm md:text-base">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm md:text-base text-gray-900 mb-1 md:mb-2">{step.title}</h3>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tips */}
      <div className="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-4 md:p-6 mt-8 md:mt-10">
        <h3 className="font-bold text-sm md:text-base text-gray-900 mb-3 md:mb-4">Measurement Tips:</h3>
        <ul className="space-y-2 md:space-y-3 text-xs md:text-sm text-gray-700">
          <li>• Use a soft measuring tape, not a ruler</li>
          <li>• Measure over thin clothing or directly on your body</li>
          <li>• Keep the tape snug but not tight</li>
          <li>• Take measurements while standing in front of a mirror</li>
          <li>• Have someone help you for more accurate measurements</li>
          <li>• Write down your measurements to compare with our size charts</li>
        </ul>
      </div>
    </div>
  );
}
