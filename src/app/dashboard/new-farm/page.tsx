'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewFarmPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        latitude: '',
        longitude: '',
        landSizeAcres: '',
        soilType: 'LOAMY'
    });

    const handleGetCurrentLocation = async () => {
        setLoading(true);

        const fallbackToIpLocation = async () => {
            try {
                console.log("Falling back to IP-based location...");
                const res = await fetch('https://ipapi.co/json/');
                if (!res.ok) throw new Error("IP Geolocation failed");
                const data = await res.json();

                if (data.latitude && data.longitude) {
                    setFormData(prev => ({
                        ...prev,
                        latitude: data.latitude.toString(),
                        longitude: data.longitude.toString()
                    }));
                } else {
                    throw new Error("Invalid IP location data");
                }
            } catch (ipError) {
                console.error("IP fallback error", ipError);
                alert("Unable to retrieve your location automatically. Please enter it manually.");
            } finally {
                setLoading(false);
            }
        };

        if (!navigator.geolocation) {
            await fallbackToIpLocation();
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setFormData(prev => ({
                    ...prev,
                    latitude: position.coords.latitude.toString(),
                    longitude: position.coords.longitude.toString()
                }));
                setLoading(false);
            },
            (error) => {
                console.warn("Browser Geolocation Error:", error.message);
                // Fallback to IP API if browser permissions are denied or unavailable
                fallbackToIpLocation();
            },
            { timeout: 10000 } // Add a timeout so it doesn't hang forever
        );
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = localStorage.getItem('agri_token');
            const res = await fetch('/api/farms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                router.push('/dashboard');
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
                    <span style={{ color: '#16191f' }}>Register new farm</span>
                </div>
                <h1 style={{ fontSize: '24px', fontWeight: 500, margin: 0 }}>Create Farm Resource</h1>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="aws-container" style={{ maxWidth: '800px' }}>
                    <div className="aws-container-header">
                        General configuration
                    </div>
                    <div className="aws-container-body">
                        <div className="aws-input-group">
                            <label>Farm identifier</label>
                            <input
                                type="text" required placeholder="e.g. North Plot A"
                                value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                            <div style={{ fontSize: '12px', color: '#545b64', marginTop: '4px' }}>A unique name to identify this land resource in your dashboard.</div>
                        </div>

                        <div className="aws-input-group">
                            <label>Soil profile</label>
                            <select value={formData.soilType} onChange={e => setFormData({ ...formData, soilType: e.target.value })}>
                                <option value="CLAY">Clay (High water retention)</option>
                                <option value="SANDY">Sandy (Good drainage)</option>
                                <option value="LOAMY">Loamy (Ideal balance)</option>
                                <option value="SILT">Silt (High fertility)</option>
                                <option value="PEATY">Peaty (High organic matter)</option>
                            </select>
                        </div>

                        <div className="aws-input-group">
                            <label>Total area (Acres)</label>
                            <input
                                type="number" step="0.1" required placeholder="5.5"
                                value={formData.landSizeAcres} onChange={e => setFormData({ ...formData, landSizeAcres: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                <div className="aws-container" style={{ maxWidth: '800px' }}>
                    <div className="aws-container-header">
                        Geospatial settings
                    </div>
                    <div className="aws-container-body">
                        <div style={{ padding: '15px', background: '#f8f8f8', border: '1px solid #eaeded', borderLeft: '4px solid #0073bb', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ fontSize: '14px', color: '#16191f' }}>
                                Automatically detect geometry coordinates via browser Geolocation API.
                            </div>
                            <button
                                type="button"
                                onClick={handleGetCurrentLocation}
                                className="aws-btn aws-btn-blue"
                            >
                                Request Location
                            </button>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div className="aws-input-group">
                                <label>Latitude</label>
                                <input
                                    type="text" required placeholder="23.2599"
                                    value={formData.latitude} onChange={e => setFormData({ ...formData, latitude: e.target.value })}
                                />
                            </div>
                            <div className="aws-input-group">
                                <label>Longitude</label>
                                <input
                                    type="text" required placeholder="77.4126"
                                    value={formData.longitude} onChange={e => setFormData({ ...formData, longitude: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '15px', maxWidth: '800px' }}>
                    <Link href="/dashboard" className="aws-btn">
                        Cancel
                    </Link>
                    <button type="submit" className="aws-btn aws-btn-primary" disabled={loading}>
                        {loading ? 'Processing...' : 'Create farm'}
                    </button>
                </div>
            </form>
        </div>
    );
}
