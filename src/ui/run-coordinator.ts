export interface RunTicket {
  id: number;
  signal: AbortSignal;
}

export class RunCoordinator {
  private generation = 0;
  private current: { id: number; controller: AbortController } | undefined;

  start(): RunTicket {
    this.current?.controller.abort();
    const controller = new AbortController();
    const id = ++this.generation;
    this.current = { id, controller };
    return { id, signal: controller.signal };
  }

  invalidate(): void {
    this.generation += 1;
    this.current?.controller.abort();
    this.current = undefined;
  }

  isCurrent(id: number): boolean {
    return this.current?.id === id;
  }

  finish(id: number): boolean {
    if (!this.isCurrent(id)) return false;
    this.current = undefined;
    return true;
  }
}
