'use client';

import { useState, use } from 'react';
import Link from 'next/link';

export default function FarmRecommendationPage({ params }: { params: Promise<{ farmId: string }> }) {
    const resolvedParams = use(params);
    const farmId = resolvedParams.farmId;

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [weatherUsed, setWeatherUsed] = useState<any>(null);
    const [formData, setFormData] = useState({
        season: 'KHARIF'
    });

    const handlePredict = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);
        setWeatherUsed(null); // Clear previous weather data

        // Simulate SageMaker latency for aesthetic effect
        await new Promise(resolve => setTimeout(resolve, 2000));

        try {
            const token = localStorage.getItem('agri_token');
            const res = await fetch('/api/recommendations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    farmId,
                    ...formData
                })
            });

            if (res.ok) {
                const data = await res.json();
                setResult(data.history);
                setWeatherUsed(data.weatherUsedForInference);
            } else {
                const errData = await res.json();
                alert(errData.error || "Failed to run inference");
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="aws-main">

            <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', gap: '8px', fontSize: '14px', color: '#545b64', marginBottom: '10px' }}>
                    <Link href="/dashboard" style={{ color: '#0073bb', textDecoration: 'none' }}>Farms</Link>
                    <span>&gt;</span>
                    <span>{farmId}</span>
                    <span>&gt;</span>
                    <span style={{ color: '#16191f' }}>Inference Endpoint</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h1 style={{ fontSize: '24px', fontWeight: 500, margin: 0 }}>AI Crop Inference</h1>
                </div>
            </div>

            <div className="aws-container">
                <div className="aws-container-header">
                    Run New Inference Task
                </div>
                <div className="aws-container-body" style={{ maxWidth: '600px' }}>
                    <form onSubmit={handlePredict}>
                        <div className="aws-input-group">
                            <label>Planting Season</label>
                            <select value={formData.season} onChange={e => setFormData({ ...formData, season: e.target.value })}>
                                <option value="KHARIF">Kharif (Monsoon)</option>
                                <option value="RABI">Rabi (Winter)</option>
                                <option value="ZAID">Zaid (Summer)</option>
                            </select>
                            <div style={{ fontSize: '12px', color: '#545b64', marginTop: '4px' }}>
                                Ensure correct season is requested. Background jobs will aggregate real-time OpenWeatherMap data.
                            </div>
                        </div>

                        <button type="submit" className="aws-btn aws-btn-primary" disabled={loading}>
                            {loading ? 'Initializing Model...' : 'Execute Inference Task'}
                        </button>
                    </form>
                </div>
            </div>

            {loading && (
                <div className="aws-container" style={{ padding: '40px', textAlign: 'center' }}>
                    <div style={{ color: '#0073bb', fontWeight: 700, marginBottom: '10px' }}>Provisioning Inference Instance...</div>
                    <div style={{ color: '#545b64', fontSize: '14px' }}>Fetching coordinates, querying Weather API, running ML model.</div>
                </div>
            )}

            {result && !loading && (
                <div className="aws-container">
                    <div className="aws-container-header">
                        Task Output Details
                        <div style={{ fontSize: '12px', color: '#1d8102', background: '#e7f5e5', border: '1px solid #1d8102', padding: '2px 8px', borderRadius: '20px' }}>
                            Success
                        </div>
                    </div>
                    <div className="aws-container-body" style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>

                        {/* Properties left panel */}
                        <div style={{ flex: 1, minWidth: '300px' }}>
                            <h4 style={{ fontSize: '16px', fontWeight: 500, borderBottom: '1px solid #eaeded', paddingBottom: '10px', marginBottom: '15px' }}>
                                Predicted Output Summary
                            </h4>

                            <table style={{ width: '100%', fontSize: '14px', lineHeight: '2' }}>
                                <tbody>
                                    <tr>
                                        <td style={{ color: '#545b64', width: '40%' }}>Suggested Crop Class</td>
                                        <td style={{ fontWeight: 700 }}>{result.recommendedCrop}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ color: '#545b64' }}>Confidence Score</td>
                                        <td>{(result.confidenceScore * 100).toFixed(1)}%</td>
                                    </tr>
                                    <tr>
                                        <td style={{ color: '#545b64' }}>Profitability Index</td>
                                        <td style={{ color: '#1d8102', fontWeight: 700 }}>{result.profitabilityScore}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ color: '#545b64' }}>Target Season</td>
                                        <td>{formData.season}</td>
                                    </tr>
                                </tbody>
                            </table>

                            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                                <button
                                    onClick={() => window.open('https://epubs.icar.org.in/ejournal/index.php/IndFarm/index', '_blank')}
                                    className="aws-btn aws-btn-primary"
                                >
                                    View ICAR Journals
                                </button>
                                <button
                                    onClick={() => window.open(`https://www.amazon.com/s?k=${encodeURIComponent(result.recommendedCrop + ' seeds')}`, '_blank')}
                                    className="aws-btn"
                                >
                                    Browse Amazon Seed Store
                                </button>
                            </div>
                        </div>

                        {/* Weather right panel */}
                        {weatherUsed && (
                            <div style={{ flex: 1, minWidth: '300px' }}>
                                <h4 style={{ fontSize: '16px', fontWeight: 500, borderBottom: '1px solid #eaeded', paddingBottom: '10px', marginBottom: '15px' }}>
                                    Env Variables (Proxied)
                                </h4>
                                <table style={{ width: '100%', fontSize: '14px', lineHeight: '2' }}>
                                    <tbody>
                                        <tr>
                                            <td style={{ color: '#545b64', width: '40%' }}>API Source</td>
                                            <td>OpenWeatherMap Backend</td>
                                        </tr>
                                        <tr>
                                            <td style={{ color: '#545b64' }}>Mean Temp (°C)</td>
                                            <td>{weatherUsed.temperature.toFixed(1)}</td>
                                        </tr>
                                        <tr>
                                            <td style={{ color: '#545b64' }}>Humidity (%)</td>
                                            <td>{weatherUsed.humidity.toFixed(0)}</td>
                                        </tr>
                                        <tr>
                                            <td style={{ color: '#545b64' }}>Precipitation 1h (mm)</td>
                                            <td>{weatherUsed.rainfall.toFixed(1)}</td>
                                        </tr>
                                        <tr>
                                            <td style={{ color: '#545b64' }}>Atmospheric Cond</td>
                                            <td>{weatherUsed.condition}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
