import time

def calc_time(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        func(*args, **kwargs)
        end = time.time()
        with open("server/benchmark/time.txt", "a") as f:
            f.write(f'{end - start:.3f}: {func.__name__}:{f" {kwargs} "}\n')

    return wrapper
