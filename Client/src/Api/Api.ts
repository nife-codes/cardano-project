import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  withCredentials: false,
});

interface MintBatchPayload {
  batch_id: string;
  medicine_name: string;
  composition: string;
  manufacturer_id: string;
  manufactured_date: string;
  expiry_date: string;
  quantity: number;
  policy_id: string;
  asset_name: string;
  manufacturer_wallet: string;
  tx_hash: string;
}

interface MintBatchResponse {
  success: boolean;
  data: any;
  message: string;
}

// Mint a new batch
export const mintBatch = async (
  payload: MintBatchPayload
): Promise<MintBatchResponse> => {
  const response = await api.post("mint/", payload);
  return response.data;
};

// // Get all batches (if you have a GET endpoint)
// export const getBatches = async (): Promise<any[]> => {
//   const response = await api.get("/mint");
//   console.log(response.data.data);
//   return response.data.data as any[];
// };
