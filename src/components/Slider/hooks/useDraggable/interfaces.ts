export interface DraggableOptions {
  direction?: 'horizontal' | 'vertical';
  enabled?: boolean;
  inertia?: boolean;
}

export interface DraggableRef {
  current: HTMLElement | null;
}
