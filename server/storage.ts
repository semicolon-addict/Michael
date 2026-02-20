export interface IStorage {
  createContactSubmission(submission: any): Promise<any>;
}

export const storage: IStorage = {
  async createContactSubmission(submission) {
    console.log("Saving submission (mock):", submission);

    return {
      id: Date.now(),
      ...submission,
      createdAt: new Date(),
    };
  },
};
