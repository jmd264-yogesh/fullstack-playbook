# Types of Version Control Systems

Version Control Systems are categorized based on their underlying storage architecture and collaboration model.

---

## 1. Local Version Control Systems (LVCS)

Local VCS stores all file versions directly on a **single developer machine**.

- **Characteristics**: Works entirely offline, requires no network connection, intended for single-user projects.
- **Drawback**: **Single point of failure**. If the local hard drive is corrupted, the entire history is permanently lost.

---

## 2. Centralized Version Control Systems (CVCS)

Centralized VCS uses a single central server that contains the full project history. Developers check out files from the central server and commit changes back directly.

```mermaid
flowchart TD
    subgraph Server ["Central Server"]
        Repo["Central Repository"]
    end

    subgraph PC1 ["Workstation #1"]
        WC1["Working Copy"]
    end

    subgraph PC2 ["Workstation #2"]
        WC2["Working Copy"]
    end

    WC1 -- "commit" --> Repo
    Repo -- "update / checkout" --> WC1

    WC2 -- "commit" --> Repo
    Repo -- "update / checkout" --> WC2

    style Repo fill:#19105b,color:#fff,stroke:#0d0a33,stroke-width:2px
    style WC1 fill:#f0ecff,color:#19105b,stroke:#ff6196,stroke-width:2px
    style WC2 fill:#f0ecff,color:#19105b,stroke:#ff6196,stroke-width:2px
```

### Popular Examples
- **Subversion (SVN)**: Widely used in enterprise systems requiring strict administrative access control over subfolders.
- **CVS (Concurrent Versions System)**: An early pioneer system from the 1990s that laid the groundwork for SVN.

### Pros & Cons
- ✅ **Pros**: Simple mental model, fine-grained folder-level access permissions.
- ❌ **Cons**: Single point of failure. If the central server goes offline, developers cannot commit code or view history.

---

## 3. Distributed Version Control Systems (DVCS)

In a Distributed VCS, every developer mirrors the **full repository locally**, including its complete commit history.

```mermaid
flowchart TD
    subgraph Server ["Remote Central Server"]
        ServerRepo["Remote Repository"]
    end

    subgraph PC1 ["Workstation #1"]
        Repo1["Local Repository"]
        WC1["Working Copy"]
        WC1 -- "git commit" --> Repo1
        Repo1 -- "git checkout" --> WC1
    end

    subgraph PC2 ["Workstation #2"]
        Repo2["Local Repository"]
        WC2["Working Copy"]
        WC2 -- "git commit" --> Repo2
        Repo2 -- "git checkout" --> WC2
    end

    Repo1 -- "git push" --> ServerRepo
    ServerRepo -- "git pull" --> Repo1

    Repo2 -- "git push" --> ServerRepo
    ServerRepo -- "git pull" --> Repo2

    style ServerRepo fill:#19105b,color:#fff,stroke:#0d0a33,stroke-width:2px
    style Repo1 fill:#ff6196,color:#fff,stroke:#ff4785,stroke-width:2px
    style Repo2 fill:#ff6196,color:#fff,stroke:#ff4785,stroke-width:2px
    style WC1 fill:#f0ecff,color:#19105b,stroke:#ff6196,stroke-width:1px
    style WC2 fill:#f0ecff,color:#19105b,stroke:#ff6196,stroke-width:1px
```

### Popular Examples
- **Git**: Created by Linus Torvalds in 2005. The global standard for software development.
- **Mercurial**: Designed as a fast, simpler alternative to Git.
- **Bazaar**: Developed by Canonical (Ubuntu), supports both centralized and distributed workflows.

### Pros & Cons
- ✅ **Pros**: Fast local operations (commits, diffs, log checks happen offline), extreme fault tolerance (every clone is a full backup).
- ❌ **Cons**: Slightly steeper learning curve (requires understanding `commit` vs `push`).

---

## 4. Comparison Summary

| Feature | Centralized (CVCS) | Distributed (DVCS) |
|---|---|---|
| **Local Copy** | Working files only | Full repository & history clone |
| **Offline Operations** | Restricted | Full access (Commit, Log, Branch, Diff) |
| **Commit Process** | Single step (Saves directly to server) | Two steps (`commit` to local $\rightarrow$ `push` to remote) |
| **Speed** | Network-dependent | Blazing fast (local disk reads) |
| **Primary Tool** | Subversion (SVN) | **Git** |
