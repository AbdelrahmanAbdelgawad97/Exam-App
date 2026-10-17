import getToken from "../../../hooks/use-token"
import { api } from "../../../shared/lib/axios";
import type { iClearLogs } from "../../user/types/iClearAllLogs";
import type { iDeleteSpecificLog } from "../../user/types/iDeleteSpecificLogs";
import type { LogsTypesAdmins } from "../../user/types/iLogsAdmins";
import type { iLogsUsers } from "../../user/types/iLogsTypesUsers";
import type { iSpecificLog } from "../../user/types/iSpecificLog";
import { DIPLOMA_ENDPOINT } from "../auth.endpoint";


let theToken = getToken().getToken();

// logs admin
export const getLogsAudit = async (parameter: number): Promise<LogsTypesAdmins> => {
    const response = await api.get<LogsTypesAdmins>(`${DIPLOMA_ENDPOINT}/admin/audit-logs?page=${parameter}`,{
        headers: {
            Authorization: `Bearer ${theToken}`,
        }
    });

    return response.data;
};

// get specific log

export async function getSpecificLog(id: string) {

    theToken = getToken().getToken();

    const response = await api.get<iSpecificLog>(`${DIPLOMA_ENDPOINT}/admin/audit-logs/${id}`,{
        
        headers: {
            Authorization: `Bearer ${theToken}`,
        }
    })

    return response.data;

}

// delete one log

export async function deleteSpecificLog(id: string) {

    theToken = getToken().getToken();

    await api.delete<iDeleteSpecificLog>(`${DIPLOMA_ENDPOINT}/admin/audit-logs/${id}`,{
        
        headers: {
            Authorization: `Bearer ${theToken}`,
        }
    })


}

// clear logs

export async function clearAllLogs() {

    theToken = getToken().getToken();

    await api.delete<iClearLogs>(`${DIPLOMA_ENDPOINT}/admin/audit-logs`,{
        
        headers: {
            Authorization: `Bearer ${theToken}`,
        }
    })


}

// Logs Users 

export const getLogsusers = async (parameter: number): Promise<iLogsUsers> => {
    const response = await api.get<iLogsUsers>(`${DIPLOMA_ENDPOINT}/admin/users?page=${parameter}`,{
        headers: {
            Authorization: `Bearer ${theToken}`,
        }
    });

    return response.data;
};