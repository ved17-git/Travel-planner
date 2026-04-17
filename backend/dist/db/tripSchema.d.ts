import mongoose from "mongoose";
export declare const tripSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    userId: mongoose.Types.ObjectId;
    destination: string;
    itinerary: mongoose.Types.DocumentArray<{
        activities: mongoose.Types.DocumentArray<{
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, {}, {}> & {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }>;
        day?: number | null;
        title?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        activities: mongoose.Types.DocumentArray<{
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, {}, {}> & {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }>;
        day?: number | null;
        title?: string | null;
    }, {}, {}> & {
        activities: mongoose.Types.DocumentArray<{
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, {}, {}> & {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }>;
        day?: number | null;
        title?: string | null;
    }>;
    budget: "Low" | "Medium" | "High";
    numberOfDays: number;
    interests: ("Food" | "Culture" | "Adventure" | "Shopping" | "Nature" | "Nightlife" | "History" | "Art")[];
    hotelSuggestions: mongoose.Types.DocumentArray<{
        type?: string | null;
        name?: string | null;
        location?: {
            lat?: number | null;
            lng?: number | null;
        } | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        type?: string | null;
        name?: string | null;
        location?: {
            lat?: number | null;
            lng?: number | null;
        } | null;
    }, {}, {}> & {
        type?: string | null;
        name?: string | null;
        location?: {
            lat?: number | null;
            lng?: number | null;
        } | null;
    }>;
    budgetEstimate?: {
        food?: number | null;
        activities?: number | null;
        flights?: number | null;
        accommodation?: number | null;
        total?: number | null;
    } | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    userId: mongoose.Types.ObjectId;
    destination: string;
    itinerary: mongoose.Types.DocumentArray<{
        activities: mongoose.Types.DocumentArray<{
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, {}, {}> & {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }>;
        day?: number | null;
        title?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        activities: mongoose.Types.DocumentArray<{
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, {}, {}> & {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }>;
        day?: number | null;
        title?: string | null;
    }, {}, {}> & {
        activities: mongoose.Types.DocumentArray<{
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, {}, {}> & {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }>;
        day?: number | null;
        title?: string | null;
    }>;
    budget: "Low" | "Medium" | "High";
    numberOfDays: number;
    interests: ("Food" | "Culture" | "Adventure" | "Shopping" | "Nature" | "Nightlife" | "History" | "Art")[];
    hotelSuggestions: mongoose.Types.DocumentArray<{
        type?: string | null;
        name?: string | null;
        location?: {
            lat?: number | null;
            lng?: number | null;
        } | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        type?: string | null;
        name?: string | null;
        location?: {
            lat?: number | null;
            lng?: number | null;
        } | null;
    }, {}, {}> & {
        type?: string | null;
        name?: string | null;
        location?: {
            lat?: number | null;
            lng?: number | null;
        } | null;
    }>;
    budgetEstimate?: {
        food?: number | null;
        activities?: number | null;
        flights?: number | null;
        accommodation?: number | null;
        total?: number | null;
    } | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    userId: mongoose.Types.ObjectId;
    destination: string;
    itinerary: mongoose.Types.DocumentArray<{
        activities: mongoose.Types.DocumentArray<{
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, {}, {}> & {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }>;
        day?: number | null;
        title?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        activities: mongoose.Types.DocumentArray<{
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, {}, {}> & {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }>;
        day?: number | null;
        title?: string | null;
    }, {}, {}> & {
        activities: mongoose.Types.DocumentArray<{
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, {}, {}> & {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }>;
        day?: number | null;
        title?: string | null;
    }>;
    budget: "Low" | "Medium" | "High";
    numberOfDays: number;
    interests: ("Food" | "Culture" | "Adventure" | "Shopping" | "Nature" | "Nightlife" | "History" | "Art")[];
    hotelSuggestions: mongoose.Types.DocumentArray<{
        type?: string | null;
        name?: string | null;
        location?: {
            lat?: number | null;
            lng?: number | null;
        } | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        type?: string | null;
        name?: string | null;
        location?: {
            lat?: number | null;
            lng?: number | null;
        } | null;
    }, {}, {}> & {
        type?: string | null;
        name?: string | null;
        location?: {
            lat?: number | null;
            lng?: number | null;
        } | null;
    }>;
    budgetEstimate?: {
        food?: number | null;
        activities?: number | null;
        flights?: number | null;
        accommodation?: number | null;
        total?: number | null;
    } | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    userId: mongoose.Types.ObjectId;
    destination: string;
    itinerary: mongoose.Types.DocumentArray<{
        activities: mongoose.Types.DocumentArray<{
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, {}, {}> & {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }>;
        day?: number | null;
        title?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        activities: mongoose.Types.DocumentArray<{
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, {}, {}> & {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }>;
        day?: number | null;
        title?: string | null;
    }, {}, {}> & {
        activities: mongoose.Types.DocumentArray<{
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, {}, {}> & {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }>;
        day?: number | null;
        title?: string | null;
    }>;
    budget: "Low" | "Medium" | "High";
    numberOfDays: number;
    interests: ("Food" | "Culture" | "Adventure" | "Shopping" | "Nature" | "Nightlife" | "History" | "Art")[];
    hotelSuggestions: mongoose.Types.DocumentArray<{
        type?: string | null;
        name?: string | null;
        location?: {
            lat?: number | null;
            lng?: number | null;
        } | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        type?: string | null;
        name?: string | null;
        location?: {
            lat?: number | null;
            lng?: number | null;
        } | null;
    }, {}, {}> & {
        type?: string | null;
        name?: string | null;
        location?: {
            lat?: number | null;
            lng?: number | null;
        } | null;
    }>;
    budgetEstimate?: {
        food?: number | null;
        activities?: number | null;
        flights?: number | null;
        accommodation?: number | null;
        total?: number | null;
    } | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export declare const tripModel: mongoose.Model<{
    userId: mongoose.Types.ObjectId;
    destination: string;
    itinerary: mongoose.Types.DocumentArray<{
        activities: mongoose.Types.DocumentArray<{
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, {}, {}> & {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }>;
        day?: number | null;
        title?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        activities: mongoose.Types.DocumentArray<{
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, {}, {}> & {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }>;
        day?: number | null;
        title?: string | null;
    }, {}, {}> & {
        activities: mongoose.Types.DocumentArray<{
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, {}, {}> & {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }>;
        day?: number | null;
        title?: string | null;
    }>;
    budget: "Low" | "Medium" | "High";
    numberOfDays: number;
    interests: ("Food" | "Culture" | "Adventure" | "Shopping" | "Nature" | "Nightlife" | "History" | "Art")[];
    hotelSuggestions: mongoose.Types.DocumentArray<{
        type?: string | null;
        name?: string | null;
        location?: {
            lat?: number | null;
            lng?: number | null;
        } | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        type?: string | null;
        name?: string | null;
        location?: {
            lat?: number | null;
            lng?: number | null;
        } | null;
    }, {}, {}> & {
        type?: string | null;
        name?: string | null;
        location?: {
            lat?: number | null;
            lng?: number | null;
        } | null;
    }>;
    budgetEstimate?: {
        food?: number | null;
        activities?: number | null;
        flights?: number | null;
        accommodation?: number | null;
        total?: number | null;
    } | null;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    userId: mongoose.Types.ObjectId;
    destination: string;
    itinerary: mongoose.Types.DocumentArray<{
        activities: mongoose.Types.DocumentArray<{
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, {}, {}> & {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }>;
        day?: number | null;
        title?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        activities: mongoose.Types.DocumentArray<{
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, {}, {}> & {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }>;
        day?: number | null;
        title?: string | null;
    }, {}, {}> & {
        activities: mongoose.Types.DocumentArray<{
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, {}, {}> & {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }>;
        day?: number | null;
        title?: string | null;
    }>;
    budget: "Low" | "Medium" | "High";
    numberOfDays: number;
    interests: ("Food" | "Culture" | "Adventure" | "Shopping" | "Nature" | "Nightlife" | "History" | "Art")[];
    hotelSuggestions: mongoose.Types.DocumentArray<{
        type?: string | null;
        name?: string | null;
        location?: {
            lat?: number | null;
            lng?: number | null;
        } | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        type?: string | null;
        name?: string | null;
        location?: {
            lat?: number | null;
            lng?: number | null;
        } | null;
    }, {}, {}> & {
        type?: string | null;
        name?: string | null;
        location?: {
            lat?: number | null;
            lng?: number | null;
        } | null;
    }>;
    budgetEstimate?: {
        food?: number | null;
        activities?: number | null;
        flights?: number | null;
        accommodation?: number | null;
        total?: number | null;
    } | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    userId: mongoose.Types.ObjectId;
    destination: string;
    itinerary: mongoose.Types.DocumentArray<{
        activities: mongoose.Types.DocumentArray<{
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, {}, {}> & {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }>;
        day?: number | null;
        title?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        activities: mongoose.Types.DocumentArray<{
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, {}, {}> & {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }>;
        day?: number | null;
        title?: string | null;
    }, {}, {}> & {
        activities: mongoose.Types.DocumentArray<{
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, {}, {}> & {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }>;
        day?: number | null;
        title?: string | null;
    }>;
    budget: "Low" | "Medium" | "High";
    numberOfDays: number;
    interests: ("Food" | "Culture" | "Adventure" | "Shopping" | "Nature" | "Nightlife" | "History" | "Art")[];
    hotelSuggestions: mongoose.Types.DocumentArray<{
        type?: string | null;
        name?: string | null;
        location?: {
            lat?: number | null;
            lng?: number | null;
        } | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        type?: string | null;
        name?: string | null;
        location?: {
            lat?: number | null;
            lng?: number | null;
        } | null;
    }, {}, {}> & {
        type?: string | null;
        name?: string | null;
        location?: {
            lat?: number | null;
            lng?: number | null;
        } | null;
    }>;
    budgetEstimate?: {
        food?: number | null;
        activities?: number | null;
        flights?: number | null;
        accommodation?: number | null;
        total?: number | null;
    } | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    userId: mongoose.Types.ObjectId;
    destination: string;
    itinerary: mongoose.Types.DocumentArray<{
        activities: mongoose.Types.DocumentArray<{
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, {}, {}> & {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }>;
        day?: number | null;
        title?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        activities: mongoose.Types.DocumentArray<{
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, {}, {}> & {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }>;
        day?: number | null;
        title?: string | null;
    }, {}, {}> & {
        activities: mongoose.Types.DocumentArray<{
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, {}, {}> & {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }>;
        day?: number | null;
        title?: string | null;
    }>;
    budget: "Low" | "Medium" | "High";
    numberOfDays: number;
    interests: ("Food" | "Culture" | "Adventure" | "Shopping" | "Nature" | "Nightlife" | "History" | "Art")[];
    hotelSuggestions: mongoose.Types.DocumentArray<{
        type?: string | null;
        name?: string | null;
        location?: {
            lat?: number | null;
            lng?: number | null;
        } | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        type?: string | null;
        name?: string | null;
        location?: {
            lat?: number | null;
            lng?: number | null;
        } | null;
    }, {}, {}> & {
        type?: string | null;
        name?: string | null;
        location?: {
            lat?: number | null;
            lng?: number | null;
        } | null;
    }>;
    budgetEstimate?: {
        food?: number | null;
        activities?: number | null;
        flights?: number | null;
        accommodation?: number | null;
        total?: number | null;
    } | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    userId: mongoose.Types.ObjectId;
    destination: string;
    itinerary: mongoose.Types.DocumentArray<{
        activities: mongoose.Types.DocumentArray<{
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, {}, {}> & {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }>;
        day?: number | null;
        title?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        activities: mongoose.Types.DocumentArray<{
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, {}, {}> & {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }>;
        day?: number | null;
        title?: string | null;
    }, {}, {}> & {
        activities: mongoose.Types.DocumentArray<{
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, {}, {}> & {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }>;
        day?: number | null;
        title?: string | null;
    }>;
    budget: "Low" | "Medium" | "High";
    numberOfDays: number;
    interests: ("Food" | "Culture" | "Adventure" | "Shopping" | "Nature" | "Nightlife" | "History" | "Art")[];
    hotelSuggestions: mongoose.Types.DocumentArray<{
        type?: string | null;
        name?: string | null;
        location?: {
            lat?: number | null;
            lng?: number | null;
        } | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        type?: string | null;
        name?: string | null;
        location?: {
            lat?: number | null;
            lng?: number | null;
        } | null;
    }, {}, {}> & {
        type?: string | null;
        name?: string | null;
        location?: {
            lat?: number | null;
            lng?: number | null;
        } | null;
    }>;
    budgetEstimate?: {
        food?: number | null;
        activities?: number | null;
        flights?: number | null;
        accommodation?: number | null;
        total?: number | null;
    } | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    userId: mongoose.Types.ObjectId;
    destination: string;
    itinerary: mongoose.Types.DocumentArray<{
        activities: mongoose.Types.DocumentArray<{
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, {}, {}> & {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }>;
        day?: number | null;
        title?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        activities: mongoose.Types.DocumentArray<{
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, {}, {}> & {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }>;
        day?: number | null;
        title?: string | null;
    }, {}, {}> & {
        activities: mongoose.Types.DocumentArray<{
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, {}, {}> & {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }>;
        day?: number | null;
        title?: string | null;
    }>;
    budget: "Low" | "Medium" | "High";
    numberOfDays: number;
    interests: ("Food" | "Culture" | "Adventure" | "Shopping" | "Nature" | "Nightlife" | "History" | "Art")[];
    hotelSuggestions: mongoose.Types.DocumentArray<{
        type?: string | null;
        name?: string | null;
        location?: {
            lat?: number | null;
            lng?: number | null;
        } | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        type?: string | null;
        name?: string | null;
        location?: {
            lat?: number | null;
            lng?: number | null;
        } | null;
    }, {}, {}> & {
        type?: string | null;
        name?: string | null;
        location?: {
            lat?: number | null;
            lng?: number | null;
        } | null;
    }>;
    budgetEstimate?: {
        food?: number | null;
        activities?: number | null;
        flights?: number | null;
        accommodation?: number | null;
        total?: number | null;
    } | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    userId: mongoose.Types.ObjectId;
    destination: string;
    itinerary: mongoose.Types.DocumentArray<{
        activities: mongoose.Types.DocumentArray<{
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, {}, {}> & {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }>;
        day?: number | null;
        title?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        activities: mongoose.Types.DocumentArray<{
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, {}, {}> & {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }>;
        day?: number | null;
        title?: string | null;
    }, {}, {}> & {
        activities: mongoose.Types.DocumentArray<{
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, {}, {}> & {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }>;
        day?: number | null;
        title?: string | null;
    }>;
    budget: "Low" | "Medium" | "High";
    numberOfDays: number;
    interests: ("Food" | "Culture" | "Adventure" | "Shopping" | "Nature" | "Nightlife" | "History" | "Art")[];
    hotelSuggestions: mongoose.Types.DocumentArray<{
        type?: string | null;
        name?: string | null;
        location?: {
            lat?: number | null;
            lng?: number | null;
        } | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        type?: string | null;
        name?: string | null;
        location?: {
            lat?: number | null;
            lng?: number | null;
        } | null;
    }, {}, {}> & {
        type?: string | null;
        name?: string | null;
        location?: {
            lat?: number | null;
            lng?: number | null;
        } | null;
    }>;
    budgetEstimate?: {
        food?: number | null;
        activities?: number | null;
        flights?: number | null;
        accommodation?: number | null;
        total?: number | null;
    } | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    userId: mongoose.Types.ObjectId;
    destination: string;
    itinerary: mongoose.Types.DocumentArray<{
        activities: mongoose.Types.DocumentArray<{
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, {}, {}> & {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }>;
        day?: number | null;
        title?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        activities: mongoose.Types.DocumentArray<{
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, {}, {}> & {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }>;
        day?: number | null;
        title?: string | null;
    }, {}, {}> & {
        activities: mongoose.Types.DocumentArray<{
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }, {}, {}> & {
            name?: string | null;
            location?: {
                lat?: number | null;
                lng?: number | null;
            } | null;
        }>;
        day?: number | null;
        title?: string | null;
    }>;
    budget: "Low" | "Medium" | "High";
    numberOfDays: number;
    interests: ("Food" | "Culture" | "Adventure" | "Shopping" | "Nature" | "Nightlife" | "History" | "Art")[];
    hotelSuggestions: mongoose.Types.DocumentArray<{
        type?: string | null;
        name?: string | null;
        location?: {
            lat?: number | null;
            lng?: number | null;
        } | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        type?: string | null;
        name?: string | null;
        location?: {
            lat?: number | null;
            lng?: number | null;
        } | null;
    }, {}, {}> & {
        type?: string | null;
        name?: string | null;
        location?: {
            lat?: number | null;
            lng?: number | null;
        } | null;
    }>;
    budgetEstimate?: {
        food?: number | null;
        activities?: number | null;
        flights?: number | null;
        accommodation?: number | null;
        total?: number | null;
    } | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=tripSchema.d.ts.map