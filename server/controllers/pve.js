const axios = require("axios");
const https = require("https");
const { Agent } = require("https");

module.exports.createTicket = async (server = { ip: "", port: 0 }, username, password) => {
    const data = await axios.post(`https://${server.ip}:${server.port}/api2/json/access/ticket`, {
        username: username,
        password: password,
    }, {
        timeout: 3000,
        httpsAgent: new Agent({ rejectUnauthorized: false }),
    });

    return data.data.data;
};

module.exports.getAllNodes = async (server = { ip: "", port: 0 }, ticket) => {
    const response = await axios.get(`https://${server.ip}:${server.port}/api2/json/nodes`, {
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        headers: {
            Cookie: `PVEAuthCookie=${ticket.ticket}`,
        },
    });

    return response.data.data;
};

module.exports.openLXCConsole = async (server = { ip: "", port: 0 }, node, containerId, ticket) => {
    const containerPart = containerId === "0" ? "" : `lxc/${containerId}`;

    const response = await axios.post(`https://${server.ip}:${server.port}/api2/json/nodes/${node}/${containerPart}/termproxy`, {}, {
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        headers: {
            Cookie: `PVEAuthCookie=${ticket.ticket}`,
            CSRFPreventionToken: ticket.CSRFPreventionToken,
        },
    });

    return response.data.data;
};

module.exports.openVNCConsole = async (server = { ip: "", port: 0 }, node, vmId, ticket) => {
    const response = await axios.post(`https://${server.ip}:${server.port}/api2/json/nodes/${node}/qemu/${vmId}/vncproxy`, { websocket: 0 }, {
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        headers: {
            Cookie: `PVEAuthCookie=${ticket.ticket}`,
            CSRFPreventionToken: ticket.CSRFPreventionToken,
        },
    });

    return response.data.data;
};

module.exports.getNodeForServer = async (server, ticket) => {
    if (server.nodeName) {
        return server.nodeName;
    }
    const nodes = await this.getAllNodes(server, ticket);
    if (nodes.length === 0) {
        throw new Error("No nodes found for the specified Proxmox server.");
    }
    return nodes[0].node;
};

module.exports.startPVEServer = async (server = { ip: "", port: 0, username: "", password: "" }, vmId, type) => {
    const ticket = await this.createTicket(server, server.username, server.password);
    const node = await this.getNodeForServer(server, ticket);

    const response = await axios.post(`https://${server.ip}:${server.port}/api2/json/nodes/${node}/${type}/${vmId}/status/start`, {}, {
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        headers: {
            Cookie: `PVEAuthCookie=${ticket.ticket}`,
            CSRFPreventionToken: ticket.CSRFPreventionToken,
        },
    });

    return response.data.data;
}

module.exports.stopPVEServer = async (server = { ip: "", port: 0, username: "", password: "" },  vmId, type) => {
    const ticket = await this.createTicket(server, server.username, server.password);
    const node = await this.getNodeForServer(server, ticket);

    const response = await axios.post(`https://${server.ip}:${server.port}/api2/json/nodes/${node}/${type}/${vmId}/status/stop`, {}, {
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        headers: {
            Cookie: `PVEAuthCookie=${ticket.ticket}`,
            CSRFPreventionToken: ticket.CSRFPreventionToken,
        },
    });

    return response.data.data;
}

module.exports.shutdownPVEServer = async (server = { ip: "", port: 0, username: "", password: "" },  vmId, type) => {
    const ticket = await this.createTicket(server, server.username, server.password);
    const node = await this.getNodeForServer(server, ticket);

    const response = await axios.post(`https://${server.ip}:${server.port}/api2/json/nodes/${node}/${type}/${vmId}/status/shutdown`, {}, {
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        headers: {
            Cookie: `PVEAuthCookie=${ticket.ticket}`,
            CSRFPreventionToken: ticket.CSRFPreventionToken,
        },
    });

    return response.data.data;
}