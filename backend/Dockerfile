FROM debian:bookworm

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN apt update
RUN apt install -y git python3 python3-pip python3-venv

WORKDIR /app/

# Create virtual environment
ENV VIRTUAL_ENV=/opt/venv
RUN python3 -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

# Install web API requirements
COPY requirements.txt .
RUN pip install -r requirements.txt
RUN pip install gunicorn

WORKDIR /

# Run web API
EXPOSE 8000
CMD [ "gunicorn", "-k", "eventlet", "-w", "1", "-b", "0.0.0.0:8000", "app:create_app()" ]
