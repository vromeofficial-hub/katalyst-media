export type PartnerType = "artist" | "manager" | "label" | "creator" | "collaborator";

export type Client = {
  id: string;
  name: string;
  type: PartnerType;
  logo: string | null;
  relationship: string;
  publiclyVisible: boolean;
  permissionToDisplay: boolean;
  projectLink: string | null;
};

/**
 * Artists and partners approved for public display.
 * Leave empty until names are ready with permission.
 */
export const clients: Client[] = [];

export function getPublicPartners() {
  return clients.filter(
    (entry) => entry.publiclyVisible && entry.permissionToDisplay,
  );
}
