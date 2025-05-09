export interface Node {
  id: string;
  name: string;
  group: number;
}

export interface Link {
  source: string;
  target: string;
  value: number;
  relationship: string;
}

export interface GraphData {
  nodes: Node[];
  links: Link[];
} 