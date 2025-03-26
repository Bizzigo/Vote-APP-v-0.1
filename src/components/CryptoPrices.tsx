
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Bitcoin, Loader2 } from 'lucide-react';

interface CryptoData {
  bitcoin?: {
    usd: number;
    usd_24h_change: number;
  };
  ripple?: {
    usd: number;
    usd_24h_change: number;
  };
}

const CryptoPrices: React.FC = () => {
  const [cryptoData, setCryptoData] = useState<CryptoData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCryptoPrices = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ripple&vs_currencies=usd&include_24hr_change=true'
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch cryptocurrency data');
        }
        
        const data = await response.json();
        setCryptoData(data);
      } catch (err) {
        console.error('Crypto fetch error:', err);
        setError('Could not load cryptocurrency data');
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoPrices();
    
    // Refresh prices every 5 minutes
    const interval = setInterval(fetchCryptoPrices, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: price < 1 ? 6 : 2
    }).format(price);
  };

  const formatChange = (change: number) => {
    const isPositive = change >= 0;
    return (
      <span className={isPositive ? 'text-green-500' : 'text-red-500'}>
        {isPositive ? '+' : ''}{change.toFixed(2)}%
      </span>
    );
  };

  return (
    <Card className="p-4 w-full">
      {loading && (
        <div className="flex justify-center py-2">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
        </div>
      )}
      
      {error && (
        <div className="text-sm text-destructive text-center py-1">
          {error}
        </div>
      )}
      
      {cryptoData && !loading && (
        <div className="flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Bitcoin className="h-5 w-5" />
              <span className="font-medium">BTC</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold">
                {cryptoData.bitcoin ? formatPrice(cryptoData.bitcoin.usd) : '-'}
              </span>
              {cryptoData.bitcoin && formatChange(cryptoData.bitcoin.usd_24h_change)}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Bitcoin className="h-5 w-5" />
              <span className="font-medium">XRP</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold">
                {cryptoData.ripple ? formatPrice(cryptoData.ripple.usd) : '-'}
              </span>
              {cryptoData.ripple && formatChange(cryptoData.ripple.usd_24h_change)}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default CryptoPrices;
