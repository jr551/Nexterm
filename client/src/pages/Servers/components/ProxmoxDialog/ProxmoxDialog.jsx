import { DialogProvider } from "@/common/components/Dialog";
import "./styles.sass";
import { useContext, useEffect, useState } from "react";
import { ServerContext } from "@/common/contexts/ServerContext.jsx";
import IconInput from "@/common/components/IconInput";
import { mdiAccountCircleOutline, mdiFormTextbox, mdiIp, mdiLockOutline, mdiServerNetwork } from "@mdi/js";
import Button from "@/common/components/Button";
import Input from "@/common/components/IconInput";
import { getRequest, patchRequest, postRequest, putRequest } from "@/common/utils/RequestUtil.js";

export const ProxmoxDialog = ({ open, onClose, currentFolderId, editServerId }) => {

    const [name, setName] = useState("");
    const [ip, setIp] = useState("");
    const [port, setPort] = useState("8006");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [nodeName, setNodeName] = useState("");

    const create = () => {
        putRequest("pve-servers", {
            name, folderId: currentFolderId, ip, port, username, password,
        }).then(async () => {
            onClose();
            loadServers();
            await postRequest("pve-servers/refresh");
        }).catch(err => console.error(err));
    };

    const edit = () => {
        patchRequest(`pve-servers/${editServerId.split("-")[1]}`, {
            name, ip, port, username, password: password === "********" ? undefined : password,
            nodeName: nodeName || null,
        }).then(async () => {
            onClose();
            await postRequest("pve-servers/refresh");
            loadServers();
        }).catch(err => console.error(err));
    }

    useEffect(() => {
        if (editServerId && open) {
            getRequest(`pve-servers/${editServerId.split("-")[1]}`).then(server => {
                setName(server.name);
                setIp(server.ip);
                setPort(server.port);
                setUsername(server.username);
                setPassword("********");
                setNodeName(server.nodeName || "");
            }).catch(err => console.error(err));
        } else {
            setName("");
            setIp("");
            setPort("8006");
            setUsername("");
            setPassword("");
            setNodeName("");
        }
    }, [editServerId, open]);

    const { loadServers } = useContext(ServerContext);

    return (
        <DialogProvider open={open} onClose={onClose}>
            <div className="proxmox-dialog">
                <h2>{editServerId ? "Edit" : "Import"} Proxmox VE</h2>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <IconInput icon={mdiFormTextbox} value={name} setValue={setName} placeholder="Name" id="name" />
                </div>

                <div className="ip-row">

                    <div className="form-group">
                        <label htmlFor="ip">Server-IP</label>
                        <Input icon={mdiIp} type="text" placeholder="Server-IP" id="ip"
                               autoComplete="off" value={ip} setValue={setIp} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="port">Port</label>
                        <input type="text" placeholder="Port" value={port}
                               onChange={(event) => setPort(event.target.value)}
                               className="small-input" id="port" />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <IconInput icon={mdiAccountCircleOutline} value={username} setValue={setUsername}
                               placeholder="Username (e.g. root@pam)" id="username" />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <IconInput icon={mdiLockOutline} value={password} setValue={setPassword} placeholder="Password"
                               type="password" id="password" />
                </div>

                {editServerId && (
                    <div className="form-group">
                        <label htmlFor="nodeName">Node Name (Optional)</label>
                        <IconInput icon={mdiServerNetwork} value={nodeName} setValue={setNodeName} 
                                   placeholder="Specific node name" id="nodeName" />
                    </div>
                )}

                <Button onClick={editServerId ? edit : create} text={editServerId ? "Edit" : "Import"} />

            </div>
        </DialogProvider>
    );
};