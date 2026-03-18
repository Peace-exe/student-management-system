const Account = () => {
  return (
    <div className="space-y-6 max-w-lg">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Account</h1>
        <p className="text-sm text-muted-foreground">Manage your profile settings.</p>
      </div>

      <div className="space-y-4 rounded-lg border border-border p-6 shadow-sm">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Name</label>
          <input
            type="text"
            defaultValue="Dr. Jane Smith"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground transition-all"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Email</label>
          <input
            type="email"
            defaultValue="jane.smith@faculty.edu"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground transition-all"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Department</label>
          <input
            type="text"
            defaultValue="Computer Science"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground transition-all"
          />
        </div>
        <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:opacity-90">
          Save changes
        </button>
      </div>
    </div>
  );
};

export default Account;
