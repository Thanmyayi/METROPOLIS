const API_BASE_URL = "http://localhost:5000/api";

// ======================================================
// COMMON API REQUEST FUNCTION
// ======================================================

const apiRequest = async (endpoint, options = {}) => {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {})
            },
            ...options
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || `API request failed: ${response.status}`
            );
        }

        return data;
    } catch (error) {
        console.error(`API Error [${endpoint}]:`, error);
        throw error;
    }
};

// ======================================================
// HEALTH
// ======================================================

export const getHealth = () => {
    return apiRequest("/health");
};

// ======================================================
// VEHICLES
// ======================================================

export const getVehicles = () => {
    return apiRequest("/vehicles");
};

export const getVehicleById = (id) => {
    return apiRequest(`/vehicles/${id}`);
};

// ======================================================
// TRAFFIC
// ======================================================

export const getTraffic = () => {
    return apiRequest("/traffic");
};

// ======================================================
// INCIDENTS
// ======================================================

export const getIncidents = () => {
    return apiRequest("/incidents");
};

export const getIncidentById = (id) => {
    return apiRequest(`/incidents/${id}`);
};

// ======================================================
// ZONES
// ======================================================

export const getZones = () => {
    return apiRequest("/zones");
};

export const getZoneById = (id) => {
    return apiRequest(`/zones/${id}`);
};

// ======================================================
// ANALYTICS
// ======================================================

export const getAnalytics = () => {
    return apiRequest("/analytics");
};

// ======================================================
// DEFAULT EXPORT
// ======================================================

const api = {
    getHealth,
    getVehicles,
    getVehicleById,
    getTraffic,
    getIncidents,
    getIncidentById,
    getZones,
    getZoneById,
    getAnalytics
};

export default api;