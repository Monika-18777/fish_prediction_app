import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Flatten, Dense
from tensorflow.keras.utils import to_categorical

# Smaller image size
image_size = (32, 32, 3)

# Very small dataset
num_classes = 3
num_samples = 60  # Just 20 per class

# Generate synthetic random images (dummy data)
X = np.random.random((num_samples, *image_size))

# Generate simple labels
y = np.array([i // 20 for i in range(num_samples)])  # 20 per class
y = to_categorical(y, num_classes=num_classes)

# Simplified model (no convolution layers)
model = Sequential([
    Flatten(input_shape=image_size),
    Dense(32, activation='relu'),
    Dense(num_classes, activation='softmax')
])

# Compile
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

# Train (very quick)
model.fit(X, y, epochs=3, batch_size=8)

# Save model
model.save('dummy_fish_model.h5')
print("✅ Model saved quickly as dummy_fish_model.h5")
