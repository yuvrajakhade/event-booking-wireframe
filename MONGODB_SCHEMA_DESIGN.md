# MongoDB Schema Design

## Event Management System

**Database:** MongoDB  
**ODM:** Mongoose  
**Version:** 1.0  
**Last Updated:** March 7, 2026

---

## 📊 Database Overview

### Collections

1. **users** - User accounts and authentication
2. **events** - Event bookings and details
3. **enquiries** - Customer enquiries
4. **inventory_items** - Master inventory catalog
5. **inventory_transactions** - Inventory movements
6. **notifications** - System notifications
7. **audit_logs** - Activity tracking

---

## 🗂️ Collection Schemas

### 1. Users Collection

```javascript
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
      select: false, // Don't return password by default
    },

    phone: {
      type: String,
      trim: true,
      match: [/^[+]?[\d\s-()]+$/, "Invalid phone format"],
    },

    role: {
      type: String,
      enum: ["user", "admin", "manager", "staff"],
      default: "user",
    },

    avatar: {
      type: String,
      default: null,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    refreshToken: {
      type: String,
      select: false,
    },

    passwordResetToken: {
      type: String,
      select: false,
    },

    passwordResetExpires: {
      type: Date,
      select: false,
    },

    lastLogin: {
      type: Date,
      default: null,
    },

    preferences: {
      language: {
        type: String,
        enum: ["en", "hi", "mr"],
        default: "en",
      },
      timezone: {
        type: String,
        default: "Asia/Kolkata",
      },
      notifications: {
        email: { type: Boolean, default: true },
        push: { type: Boolean, default: true },
        sms: { type: Boolean, default: false },
      },
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Indexes
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ role: 1 });
userSchema.index({ isActive: 1 });

// Virtual for full profile
userSchema.virtual("profile").get(function () {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    phone: this.phone,
    role: this.role,
    avatar: this.avatar,
  };
});

// Pre-save hook to hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to generate JWT
userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { userId: this._id, email: this.email, role: this.role },
    process.env.JWT_SECRET,
    { expiresIn: "24h" },
  );
};

const User = model("User", userSchema);
```

---

### 2. Events Collection

```javascript
const inventoryItemSchema = new Schema(
  {
    itemId: {
      type: Schema.Types.ObjectId,
      ref: "InventoryItem",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
      enum: ["pcs", "kg", "ltr", "set", "box"],
    },
    plannedQty: {
      type: Number,
      required: true,
      min: 0,
    },
    issuedQty: {
      type: Number,
      default: 0,
      min: 0,
    },
    returnedQty: {
      type: Number,
      default: 0,
      min: 0,
    },
    damagedQty: {
      type: Number,
      default: 0,
      min: 0,
    },
    rate: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { _id: true },
);

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Event title is required"],
      trim: true,
      maxlength: 200,
    },

    customerName: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
      match: [/^[+]?[\d\s-()]+$/, "Invalid phone format"],
    },

    email: {
      type: String,
      lowercase: true,
      trim: true,
    },

    venue: {
      type: String,
      required: [true, "Venue is required"],
      enum: [
        "Grand Palace",
        "Garden View",
        "Royal Hall",
        "Heritage Mansion",
        "Outdoor Arena",
      ],
    },

    rooms: [
      {
        type: String,
        required: true,
      },
    ],

    start: {
      type: Date,
      required: [true, "Start date is required"],
    },

    end: {
      type: Date,
      required: [true, "End date is required"],
      validate: {
        validator: function (value) {
          return value > this.start;
        },
        message: "End date must be after start date",
      },
    },

    status: {
      type: String,
      enum: ["Upcoming", "Ongoing", "Completed", "Cancelled"],
      default: "Upcoming",
    },

    eventType: {
      type: String,
      enum: ["Wedding", "Birthday", "Conference", "Corporate", "Other"],
      default: "Other",
    },

    guestCount: {
      type: Number,
      min: 0,
    },

    inventory: [inventoryItemSchema],

    checkIn: {
      timestamp: Date,
      by: { type: Schema.Types.ObjectId, ref: "User" },
      notes: String,
    },

    checkOut: {
      timestamp: Date,
      by: { type: Schema.Types.ObjectId, ref: "User" },
      notes: String,
    },

    pricing: {
      venueCharges: { type: Number, default: 0 },
      inventoryCharges: { type: Number, default: 0 },
      additionalCharges: { type: Number, default: 0 },
      discount: { type: Number, default: 0 },
      tax: { type: Number, default: 0 },
      total: { type: Number, default: 0 },
    },

    payment: {
      status: {
        type: String,
        enum: ["Pending", "Partial", "Paid", "Refunded"],
        default: "Pending",
      },
      advancePaid: { type: Number, default: 0 },
      balanceDue: { type: Number, default: 0 },
    },

    notes: {
      type: String,
      maxlength: 1000,
    },

    attachments: [
      {
        url: String,
        type: String,
        name: String,
        uploadedAt: { type: Date, default: Date.now },
      },
    ],

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

// Indexes
eventSchema.index({ status: 1, start: -1 });
eventSchema.index({ venue: 1, start: 1 });
eventSchema.index({ customerName: "text", title: "text" }); // Text search
eventSchema.index({ createdBy: 1 });
eventSchema.index({ start: 1, end: 1 });

// Virtual for duration
eventSchema.virtual("duration").get(function () {
  return Math.ceil((this.end - this.start) / (1000 * 60 * 60)); // hours
});

// Virtual for missing inventory
eventSchema.virtual("missingInventory").get(function () {
  return this.inventory.filter(
    (item) => item.issuedQty - item.returnedQty - item.damagedQty > 0,
  );
});

// Pre-save hook to update status
eventSchema.pre("save", function (next) {
  const now = new Date();
  if (this.status !== "Cancelled") {
    if (now < this.start) {
      this.status = "Upcoming";
    } else if (now >= this.start && now <= this.end) {
      this.status = "Ongoing";
    } else if (now > this.end && this.checkOut.timestamp) {
      this.status = "Completed";
    }
  }
  next();
});

const Event = model("Event", eventSchema);
```

---

### 3. Enquiries Collection

```javascript
const enquirySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
      match: [/^[+]?[\d\s-()]+$/, "Invalid phone format"],
    },

    email: {
      type: String,
      lowercase: true,
      trim: true,
    },

    eventDate: {
      type: Date,
      required: [true, "Event date is required"],
    },

    eventType: {
      type: String,
      enum: ["Wedding", "Birthday", "Conference", "Corporate", "Other"],
      default: "Other",
    },

    venue: {
      type: String,
      enum: [
        "Grand Palace",
        "Garden View",
        "Royal Hall",
        "Heritage Mansion",
        "Outdoor Arena",
        "Not Decided",
      ],
    },

    guests: {
      type: Number,
      min: 0,
    },

    budget: {
      min: Number,
      max: Number,
    },

    status: {
      type: String,
      enum: ["Open", "Follow-up due", "Converted", "Closed"],
      default: "Open",
    },

    source: {
      type: String,
      enum: [
        "Website",
        "Phone",
        "Walk-in",
        "Referral",
        "Social Media",
        "Other",
      ],
      default: "Other",
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    notes: {
      type: String,
      maxlength: 2000,
    },

    followUpDate: {
      type: Date,
    },

    followUps: [
      {
        date: { type: Date, required: true },
        notes: String,
        by: { type: Schema.Types.ObjectId, ref: "User" },
        outcome: {
          type: String,
          enum: [
            "Interested",
            "Not Interested",
            "Need More Info",
            "Callback Required",
          ],
        },
      },
    ],

    convertedToEvent: {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },

    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Indexes
enquirySchema.index({ status: 1, createdAt: -1 });
enquirySchema.index({ followUpDate: 1 });
enquirySchema.index({ assignedTo: 1 });
enquirySchema.index({ name: "text", phone: "text" });
enquirySchema.index({ source: 1 });

// Virtual for isOverdue
enquirySchema.virtual("isOverdue").get(function () {
  if (!this.followUpDate) return false;
  return this.followUpDate < new Date() && this.status === "Follow-up due";
});

const Enquiry = model("Enquiry", enquirySchema);
```

---

### 4. Inventory Items Collection

```javascript
const inventoryItemSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Item name is required"],
      trim: true,
      unique: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Furniture",
        "Decoration",
        "Catering",
        "Audio/Video",
        "Lighting",
        "Other",
      ],
    },

    unit: {
      type: String,
      required: true,
      enum: ["pcs", "kg", "ltr", "set", "box", "pair"],
    },

    totalStock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    availableStock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    inUseStock: {
      type: Number,
      default: 0,
      min: 0,
    },

    damagedStock: {
      type: Number,
      default: 0,
      min: 0,
    },

    rate: {
      type: Number,
      required: true,
      min: 0,
    },

    description: {
      type: String,
      maxlength: 500,
    },

    images: [
      {
        url: String,
        alt: String,
      },
    ],

    specifications: {
      type: Map,
      of: String,
    },

    minStockLevel: {
      type: Number,
      default: 10,
    },

    supplier: {
      name: String,
      contact: String,
      email: String,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    lastRestockDate: {
      type: Date,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

// Indexes
inventoryItemSchema.index({ name: 1 }, { unique: true });
inventoryItemSchema.index({ category: 1 });
inventoryItemSchema.index({ isActive: 1 });
inventoryItemSchema.index({ name: "text", description: "text" });

// Virtual for isLowStock
inventoryItemSchema.virtual("isLowStock").get(function () {
  return this.availableStock <= this.minStockLevel;
});

// Pre-save validation
inventoryItemSchema.pre("save", function (next) {
  if (
    this.totalStock <
    this.availableStock + this.inUseStock + this.damagedStock
  ) {
    return next(
      new Error(
        "Total stock cannot be less than sum of available, in-use, and damaged stock",
      ),
    );
  }
  next();
});

const InventoryItem = model("InventoryItem", inventoryItemSchema);
```

---

### 5. Inventory Transactions Collection

```javascript
const inventoryTransactionSchema = new Schema(
  {
    itemId: {
      type: Schema.Types.ObjectId,
      ref: "InventoryItem",
      required: true,
    },

    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },

    type: {
      type: String,
      enum: ["Issue", "Return", "Purchase", "Damage", "Loss", "Adjustment"],
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    previousStock: {
      type: Number,
      required: true,
    },

    newStock: {
      type: Number,
      required: true,
    },

    rate: {
      type: Number,
      min: 0,
    },

    totalValue: {
      type: Number,
      default: 0,
    },

    notes: {
      type: String,
      maxlength: 500,
    },

    performedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    transactionDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

// Indexes
inventoryTransactionSchema.index({ itemId: 1, transactionDate: -1 });
inventoryTransactionSchema.index({ eventId: 1 });
inventoryTransactionSchema.index({ type: 1 });
inventoryTransactionSchema.index({ transactionDate: -1 });

const InventoryTransaction = model(
  "InventoryTransaction",
  inventoryTransactionSchema,
);
```

---

### 6. Notifications Collection

```javascript
const notificationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      enum: [
        "event_reminder",
        "enquiry_followup",
        "inventory_low",
        "payment_due",
        "system",
      ],
      required: true,
    },

    title: {
      type: String,
      required: true,
      maxlength: 200,
    },

    message: {
      type: String,
      required: true,
      maxlength: 1000,
    },

    relatedEntity: {
      type: {
        type: String,
        enum: ["event", "enquiry", "inventory"],
      },
      id: Schema.Types.ObjectId,
    },

    isRead: {
      type: Boolean,
      default: false,
    },

    readAt: {
      type: Date,
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
  },
  {
    timestamps: true,
  },
);

// Indexes
notificationSchema.index({ userId: 1, isRead: 1, createdAt: -1 });
notificationSchema.index({ type: 1 });
notificationSchema.index({ createdAt: 1 }, { expireAfterSeconds: 2592000 }); // Auto-delete after 30 days

const Notification = model("Notification", notificationSchema);
```

---

### 7. Audit Logs Collection

```javascript
const auditLogSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    action: {
      type: String,
      required: true,
      enum: ["CREATE", "READ", "UPDATE", "DELETE", "LOGIN", "LOGOUT"],
    },

    resource: {
      type: String,
      required: true,
      enum: ["user", "event", "enquiry", "inventory", "transaction"],
    },

    resourceId: {
      type: Schema.Types.ObjectId,
    },

    changes: {
      type: Schema.Types.Mixed, // Store before/after values
    },

    ipAddress: {
      type: String,
    },

    userAgent: {
      type: String,
    },

    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false,
  },
);

// Indexes
auditLogSchema.index({ userId: 1, timestamp: -1 });
auditLogSchema.index({ resource: 1, resourceId: 1 });
auditLogSchema.index({ timestamp: -1 });
auditLogSchema.index({ timestamp: 1 }, { expireAfterSeconds: 7776000 }); // Auto-delete after 90 days

const AuditLog = model("AuditLog", auditLogSchema);
```

---

## 🔗 Relationships Diagram

```
┌──────────────┐         ┌──────────────┐
│    Users     │◄────────│   Events     │
│              │         │              │
└──────┬───────┘         └──────┬───────┘
       │                        │
       │                        │
       │                        ▼
       │              ┌──────────────────┐
       │              │ Inventory Items  │
       │              │                  │
       │              └──────┬───────────┘
       │                     │
       ▼                     ▼
┌──────────────┐    ┌──────────────────┐
│  Enquiries   │    │   Transactions   │
│              │    │                  │
└──────────────┘    └──────────────────┘
       │
       │
       ▼
┌──────────────┐
│   Events     │
│ (Converted)  │
└──────────────┘
```

---

## 📋 Sample Data

### Sample User

```javascript
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "name": "Raj Kumar",
  "email": "raj@example.com",
  "password": "$2b$12$hashed_password_here",
  "phone": "+919876543210",
  "role": "admin",
  "isActive": true,
  "isVerified": true,
  "preferences": {
    "language": "en",
    "timezone": "Asia/Kolkata",
    "notifications": {
      "email": true,
      "push": true,
      "sms": false
    }
  },
  "createdAt": ISODate("2026-01-01T00:00:00.000Z"),
  "updatedAt": ISODate("2026-03-07T10:00:00.000Z")
}
```

### Sample Event

```javascript
{
  "_id": ObjectId("507f1f77bcf86cd799439012"),
  "title": "Grand Wedding Ceremony",
  "customerName": "Priya Sharma",
  "phone": "+919876543210",
  "venue": "Grand Palace",
  "rooms": ["Main Hall", "Garden Area"],
  "start": ISODate("2026-04-15T06:00:00.000Z"),
  "end": ISODate("2026-04-15T18:00:00.000Z"),
  "status": "Upcoming",
  "eventType": "Wedding",
  "guestCount": 500,
  "inventory": [
    {
      "itemId": ObjectId("507f1f77bcf86cd799439013"),
      "name": "Banquet Chairs",
      "unit": "pcs",
      "plannedQty": 500,
      "issuedQty": 0,
      "returnedQty": 0,
      "rate": 10
    }
  ],
  "pricing": {
    "venueCharges": 50000,
    "inventoryCharges": 5000,
    "tax": 8250,
    "total": 63250
  },
  "payment": {
    "status": "Partial",
    "advancePaid": 20000,
    "balanceDue": 43250
  },
  "createdBy": ObjectId("507f1f77bcf86cd799439011"),
  "createdAt": ISODate("2026-03-01T10:00:00.000Z"),
  "updatedAt": ISODate("2026-03-07T10:00:00.000Z")
}
```

---

## 🚀 Performance Optimization

### Compound Indexes

```javascript
// For event listing with filters
db.events.createIndex({ status: 1, start: -1, venue: 1 });

// For enquiry dashboard
db.enquiries.createIndex({ assignedTo: 1, status: 1, followUpDate: 1 });

// For inventory stock check
db.inventoryitems.createIndex({ category: 1, isActive: 1, availableStock: 1 });
```

### Aggregation Pipelines

```javascript
// Get events with inventory summary
db.events.aggregate([
  { $match: { status: "Upcoming" } },
  { $unwind: "$inventory" },
  {
    $group: {
      _id: "$_id",
      title: { $first: "$title" },
      totalItems: { $sum: "$inventory.plannedQty" },
    },
  },
]);
```

---

**Document Version:** 1.0  
**Last Updated:** March 7, 2026
