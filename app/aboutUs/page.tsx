'use client';

import { content } from '@/data/componentDatas/content_context';
import Section from '@/component/Section';
import Container from '@/component/Container';

export default function AboutUs() {
  const aboutContent = content.AboutUs;

  return (
    <Section bgColor="bg-gray-100" padding="sm">
      <div className="h-10 md:h-8"></div>
      <Container>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white mb-8 md:mb-12 drop-shadow-lg" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
          {aboutContent?.title}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6">

          {/* Mission */}
          <div className="bg-yellow-400 p-4 md:p-8 flex flex-col justify-center rounded-lg shadow-lg">
            <h2 className="text-xl md:text-3xl font-bold mb-3 md:mb-4">{aboutContent?.missionTitle}</h2>
            <p className="text-sm md:text-base text-gray-800 leading-relaxed">{aboutContent?.missionDescription}</p>
          </div>

          {/* Vision */}
          <div className="bg-white p-4 md:p-8 flex flex-col justify-center rounded-lg shadow-lg border-2 border-gray-200">
            <h2 className="text-xl md:text-3xl font-bold mb-3 md:mb-4">{aboutContent?.visionTitle}</h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">{aboutContent?.visionDescription}</p>
          </div>

          {/* Target Market */}
          <div className="bg-white p-4 md:p-8 rounded-lg shadow-lg border-2 border-gray-200 flex flex-col justify-between">
            <div>
              <h2 className="text-xl md:text-3xl font-bold mb-3 md:mb-4">{aboutContent?.targetMarketTitle}</h2>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">{aboutContent?.targetMarketDescription}</p>
            </div>
            <div className="mt-4 md:mt-6 h-32 md:h-48 bg-linear-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-24 h-24 md:w-32 md:h-32 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
              </svg>
            </div>
          </div>

          {/* Core Values */}
          <div className="bg-gray-300 p-4 md:p-8 flex flex-col justify-center rounded-lg shadow-lg">
            <h2 className="text-xl md:text-3xl font-bold mb-3 md:mb-4">{aboutContent?.coreValuesTitle}</h2>
            <p className="text-sm md:text-base text-gray-800 leading-relaxed">{aboutContent?.coreValuesDescription}</p>
          </div>

          {/* History */}
          <div className="bg-yellow-400 p-4 md:p-8 flex flex-col justify-center rounded-lg shadow-lg">
            <h2 className="text-xl md:text-3xl font-bold mb-3 md:mb-4">{aboutContent?.historyTitle}</h2>
            <p className="text-sm md:text-base text-gray-800 leading-relaxed">{aboutContent?.historyDescription}</p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
