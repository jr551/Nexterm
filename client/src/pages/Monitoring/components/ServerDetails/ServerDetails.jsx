import { useState, useEffect } from "react";
import "./styles.sass";
import { getRequest } from "@/common/utils/RequestUtil.js";
import Icon from "@mdi/react";
import { mdiChartLine, mdiInformation, mdiHarddisk, mdiNetwork } from "@mdi/js";
import Button from "@/common/components/Button";
import MonitoringChart from "./components/MonitoringChart";

export const ServerDetails = ({ server }) => {
    const [detailData, setDetailData] = useState(null);
    const [timeRange, setTimeRange] = useState("1h");
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("overview");

    const loadDetailData = async () => {
        try {
            setLoading(true);
            const detailResponse = await getRequest(`monitoring/${server.id}?timeRange=${timeRange}`);

            setDetailData(detailResponse);
        } catch (error) {
            console.error("Error loading server details:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDetailData();

        const interval = setInterval(loadDetailData, 60000);
        return () => clearInterval(interval);
    }, [server.id, timeRange]);

    const formatUptime = (seconds) => {
        if (!seconds) return "Unknown";

        const days = Math.floor(seconds / 86400);
        const hours = Math.floor((seconds % 86400) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);

        if (days > 0) {
            return `${days} days, ${hours} hours, ${minutes} minutes`;
        } else if (hours > 0) {
            return `${hours} hours, ${minutes} minutes`;
        } else {
            return `${minutes} minutes`;
        }
    };

    const formatBytes = (bytes) => {
        if (!bytes) return "0 B";
        const k = 1024;
        const sizes = ["B", "KB", "MB", "GB", "TB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    const getLatestData = () => {
        if (detailData?.latest) return detailData.latest;
        if (detailData?.data && detailData.data.length > 0) return detailData.data[0];
        return null;
    };

    const latestData = getLatestData();

    if (loading) {
        return (
            <div className="server-details loading">
                <div className="loading-spinner">
                    <div className="spinner"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="server-details">
            <div className="details-header">
                <div className="time-range-selector">
                    {["1h", "6h", "24h"].map(range => (
                        <Button key={range} text={range} type={timeRange === range ? "primary" : "secondary"}
                                onClick={() => setTimeRange(range)} />
                    ))}
                </div>
            </div>

            <div className="details-tabs">
                <div className="tab-headers">
                    <div className={`tab-header ${activeTab === "overview" ? "active" : ""}`}
                         onClick={() => setActiveTab("overview")}>
                        <Icon path={mdiInformation} />
                        <span>Overview</span>
                    </div>
                    <div className={`tab-header ${activeTab === "charts" ? "active" : ""}`}
                         onClick={() => setActiveTab("charts")}>
                        <Icon path={mdiChartLine} />
                        <span>Charts</span>
                    </div>
                    <div className={`tab-header ${activeTab === "storage" ? "active" : ""}`}
                         onClick={() => setActiveTab("storage")}>
                        <Icon path={mdiHarddisk} />
                        <span>Storage</span>
                    </div>
                    <div className={`tab-header ${activeTab === "network" ? "active" : ""}`}
                         onClick={() => setActiveTab("network")}>
                        <Icon path={mdiNetwork} />
                        <span>Network</span>
                    </div>
                </div>

                <div className="tab-content">
                    {activeTab === "overview" && (
                        <div className="overview-tab">
                            <div className="stats-grid">
                                <div className="stat-card">
                                    <h3>System Information</h3>
                                    {latestData?.osInfo ? (
                                        <div className="info-list">
                                            <div className="info-item">
                                                <span className="label">OS:</span>
                                                <span className="value">{latestData.osInfo.name || "Unknown"}</span>
                                            </div>
                                            <div className="info-item">
                                                <span className="label">Version:</span>
                                                <span className="value">{latestData.osInfo.version || "Unknown"}</span>
                                            </div>
                                            <div className="info-item">
                                                <span className="label">Kernel:</span>
                                                <span className="value">{latestData.osInfo.kernel || "Unknown"}</span>
                                            </div>
                                            <div className="info-item">
                                                <span className="label">Architecture:</span>
                                                <span
                                                    className="value">{latestData.osInfo.architecture || "Unknown"}</span>
                                            </div>
                                            <div className="info-item">
                                                <span className="label">Uptime:</span>
                                                <span className="value">{formatUptime(latestData.uptime)}</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="no-data">No system information available</p>
                                    )}
                                </div>

                                <div className="stat-card">
                                    <h3>Performance Metrics</h3>
                                    <div className="metrics-grid">
                                        <div className="metric">
                                            <div className="metric-label">CPU Usage</div>
                                            <div className="metric-value">
                                                {latestData && latestData.cpuUsage !== null ? `${latestData.cpuUsage}%` : "N/A"}
                                            </div>
                                        </div>
                                        <div className="metric">
                                            <div className="metric-label">Memory Usage</div>
                                            <div className="metric-value">
                                                {latestData && latestData.memoryUsage !== null ? `${latestData.memoryUsage}%` : "N/A"}
                                            </div>
                                            {latestData?.memoryTotal && (
                                                <div
                                                    className="metric-total">Total: {formatBytes(latestData.memoryTotal)}</div>
                                            )}
                                        </div>
                                        <div className="metric">
                                            <div className="metric-label">Load Average</div>
                                            <div className="metric-value">
                                                {latestData?.loadAverage &&
                                                Array.isArray(latestData.loadAverage) &&
                                                latestData.loadAverage.length > 0 &&
                                                typeof latestData.loadAverage[0] === "number" ?
                                                    `${latestData.loadAverage[0].toFixed(2)}` : "N/A"
                                                }
                                            </div>
                                            {latestData?.loadAverage &&
                                                Array.isArray(latestData.loadAverage) &&
                                                latestData.loadAverage.length >= 3 &&
                                                typeof latestData.loadAverage[1] === "number" &&
                                                typeof latestData.loadAverage[2] === "number" && (
                                                    <div className="metric-detail">
                                                        5m: {latestData.loadAverage[1].toFixed(2)},
                                                        15m: {latestData.loadAverage[2].toFixed(2)}
                                                    </div>
                                                )}
                                        </div>
                                        <div className="metric">
                                            <div className="metric-label">Active Processes</div>
                                            <div className="metric-value">
                                                {latestData?.processes || "N/A"}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "charts" && (
                        <div className="charts-tab">
                            <div className="charts-grid">
                                <MonitoringChart
                                    data={detailData?.data || []}
                                    title="CPU Usage"
                                    type="cpu"
                                    color="#314BD3"
                                    unit="%"
                                    yAxisMax={100}
                                    height="300px"
                                />
                                <MonitoringChart
                                    data={detailData?.data || []}
                                    title="Memory Usage"
                                    type="memory"
                                    color="#29C16A"
                                    unit="%"
                                    yAxisMax={100}
                                    height="300px"
                                />
                                <MonitoringChart
                                    data={detailData?.data || []}
                                    title="Active Processes"
                                    type="processes"
                                    color="#DC5600"
                                    unit=""
                                    height="300px"
                                />
                            </div>
                        </div>
                    )}

                    {activeTab === "storage" && (
                        <div className="storage-tab">
                            <div className="stat-card full-width">
                                <h3>Disk Usage</h3>
                                {latestData?.diskUsage && latestData.diskUsage.length > 0 ? (
                                    <div className="disk-list">
                                        {latestData.diskUsage.map((disk, index) => (
                                            <div key={index} className="disk-item">
                                                <div className="disk-header">
                                                    <span className="disk-name">{disk.filesystem}</span>
                                                    <span className="disk-mount">{disk.mountPoint}</span>
                                                    <span className="disk-usage">{disk.usagePercent}%</span>
                                                </div>
                                                <div className="disk-bar">
                                                    <div
                                                        className="disk-fill"
                                                        style={{ width: `${disk.usagePercent}%` }}
                                                    ></div>
                                                </div>
                                                <div className="disk-details">
                                                    <span>Used: {disk.used}</span>
                                                    <span>Available: {disk.available}</span>
                                                    <span>Total: {disk.size}</span>
                                                    <span>Type: {disk.type}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="no-data">No disk usage data available</p>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === "network" && (
                        <div className="network-tab">
                            <div className="stat-card full-width">
                                <h3>Network Interfaces</h3>
                                {latestData?.networkInterfaces && latestData.networkInterfaces.length > 0 ? (
                                    <div className="network-list">
                                        {latestData.networkInterfaces.map((iface, index) => (
                                            <div key={index} className="network-item">
                                                <div className="network-header">
                                                    <span className="network-name">{iface.name}</span>
                                                </div>
                                                <div className="network-stats">
                                                    <div className="network-stat">
                                                        <span className="label">RX Bytes:</span>
                                                        <span className="value">{formatBytes(iface.rxBytes)}</span>
                                                    </div>
                                                    <div className="network-stat">
                                                        <span className="label">TX Bytes:</span>
                                                        <span className="value">{formatBytes(iface.txBytes)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="no-data">No network interface data available</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
