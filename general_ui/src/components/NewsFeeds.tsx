import { useState, useEffect } from 'react';
import { NewspaperIcon, AlertCircleIcon, LoaderIcon } from '../icons';

interface NewsItem {
  title: string;
  description: string;
  image?: string;
  link: string;
  source: string;
  pubDate?: string;
}

const RSS_FEEDS = [
  {
    url: 'https://medicalxpress.com/rss-feed/',
    name: 'medicalxpress.com'
  }
];

// Kullanarak birden fazla CORS proxy'i deneyelim
const CORS_PROXIES = [
  'https://api.allorigins.win/get?url=',
  'https://cors-anywhere.herokuapp.com/'
];

let currentProxyIndex = 0;

// Görsel URL'lerini CORS proxy'siyle sarla - dedicated image proxy kullan
const wrapImageUrlWithProxy = (imageUrl: string): string => {
  if (!imageUrl) return imageUrl;
  // wsrv.nl - profesyonel image proxy service - çok küçük boyut
  return `https://wsrv.nl/?url=${encodeURIComponent(imageUrl)}&w=200&h=80&fit=cover&q=65`;
};

export default function NewsFeeds() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);
        const allNews: NewsItem[] = [];

        for (const feed of RSS_FEEDS) {
          try {
            console.log('📰 Fetching feed:', feed.url);
            // CORS proxy kullanarak RSS feed'ini fetch et
            const corsProxy = CORS_PROXIES[currentProxyIndex % CORS_PROXIES.length];
            const response = await fetch(
              `${corsProxy}${encodeURIComponent(feed.url)}`
            );
            const data = await response.json();
            console.log('✅ Feed response:', data);
            
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data.contents, 'text/xml');
            console.log('XML parsed:', xmlDoc);

            const items = xmlDoc.querySelectorAll('item');
            console.log(`Found ${items.length} items`);
            
            items.forEach((item, index) => {
              if (index < 5) {
                const title = item.querySelector('title')?.textContent || 'No Title';
                const description = item.querySelector('description')?.textContent || '';
                const link = item.querySelector('link')?.textContent || '';
                const pubDate = item.querySelector('pubDate')?.textContent || '';

                // Görsel almaya çalış - namespace'leri kontrol et
                let image: string | undefined;
                
                // 1. media:thumbnail namespace'i kontrol et (Medicalxpress uses this)
                let mediaEl = item.getElementsByTagNameNS('http://search.yahoo.com/mrss/', 'thumbnail').item(0);
                if (mediaEl) {
                  image = mediaEl.getAttribute('url') || undefined;
                  if (image) image = wrapImageUrlWithProxy(image);
                  console.log('Found image via media:thumbnail:', image);
                }

                // 2. Fallback: media:content kontrol et
                if (!mediaEl) {
                  mediaEl = item.getElementsByTagNameNS('http://search.yahoo.com/mrss/', 'content').item(0);
                  if (mediaEl) {
                    image = mediaEl.getAttribute('url') || undefined;
                    if (image) image = wrapImageUrlWithProxy(image);
                    console.log('Found image via media:content:', image);
                  }
                }

                // 3. Enclosure kontrol et
                if (!image) {
                  const enclosure = item.querySelector('enclosure');
                  if (enclosure?.getAttribute('type')?.startsWith('image')) {
                    image = enclosure.getAttribute('url') || undefined;
                    if (image) image = wrapImageUrlWithProxy(image);
                    console.log('Found image via enclosure:', image);
                  }
                }

                // 4. Description içindeki img tag'ini kontrol et
                if (!image && description) {
                  const imgMatch = description.match(/<img[^>]+src="([^">]+)"/i);
                  if (imgMatch && imgMatch[1]) {
                    image = imgMatch[1];
                    image = wrapImageUrlWithProxy(image);
                    console.log('Found image in description:', image);
                  }
                }

                // 5. Relative URL'leri absolute'e çevir
                if (image && !image.startsWith('http')) {
                  const feedUrl = new URL(feed.url);
                  try {
                    const absoluteUrl = new URL(image, feedUrl.origin).toString();
                    image = wrapImageUrlWithProxy(absoluteUrl);
                  } catch (e) {
                    image = undefined;
                  }
                }

                // HTML tag'lerini temizle
                let cleanDescription = description;
                if (cleanDescription.includes('<')) {
                  cleanDescription = cleanDescription
                    .replace(/<img[^>]*>/g, '')
                    .replace(/<[^>]*>/g, '')
                    .substring(0, 150)
                    .trim() + '...';
                } else {
                  cleanDescription = cleanDescription.substring(0, 150).trim() + '...';
                }

                allNews.push({
                  title: title.substring(0, 80),
                  description: cleanDescription,
                  image,
                  link,
                  source: feed.name,
                  pubDate
                });
              }
            });
          } catch (err) {
            console.error(`❌ Error fetching ${feed.name}:`, err);
            currentProxyIndex++;
          }
        }

        console.log('📊 All news items:', allNews);
        
        // Tarih sırasına göre düzenle ve ilk 3'ünü al
        allNews.sort((a, b) => {
          if (!a.pubDate || !b.pubDate) return 0;
          return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
        });

        const finalNews = allNews.slice(0, 3);
        console.log('✨ Final 3 news:', finalNews);
        setNewsItems(finalNews);
      } catch (err) {
        console.error('🚨 Main error:', err);
        setError('Haberler yüklenirken hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
    const interval = setInterval(fetchNews, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-2 text-red-300">
          <AlertCircleIcon size={20} />
          <span className="text-sm">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="flex items-center space-x-2 mb-4">
        <NewspaperIcon size={24} className="text-orange-400" />
        <h2 className="text-xl font-bold text-white">Health News</h2>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <LoaderIcon size={24} className="animate-spin text-orange-400" />
          <span className="ml-2 text-gray-400">Loading news...</span>
        </div>
      ) : newsItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {newsItems.map((news, index) => (
            <a
              key={index}
              href={news.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-slate-800 border border-slate-700 rounded-lg overflow-hidden hover:border-orange-400 transition-all duration-300 flex flex-col"
            >
              {/* News Image */}
              {news.image && news.image.length > 0 ? (
                <div className="relative h-40 overflow-hidden bg-slate-700">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      // Show placeholder on error
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                    crossOrigin="anonymous"
                  />
                </div>
              ) : (
                <div className="h-40 bg-gradient-to-br from-orange-500/20 to-purple-500/20 flex items-center justify-center">
                  <NewspaperIcon size={48} className="text-orange-400/50" />
                </div>
              )}

              {/* News Content */}
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-bold text-white text-sm mb-2 line-clamp-2 group-hover:text-orange-400 transition-colors">
                  {news.title}
                </h3>
                <p className="text-gray-400 text-xs mb-3 line-clamp-2 flex-grow">
                  {news.description}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-slate-700">
                  <span className="text-xs font-semibold text-orange-400 bg-orange-500/10 px-2 py-1 rounded">
                    {news.source}
                  </span>
                  {news.pubDate && (
                    <span className="text-xs text-gray-500">
                      {new Date(news.pubDate).toLocaleDateString('en-US')}
                    </span>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 text-center">
          <NewspaperIcon size={32} className="text-gray-600 mx-auto mb-2" />
          <p className="text-gray-400">Failed to load news</p>
        </div>
      )}
    </div>
  );
}
