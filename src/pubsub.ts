const axios = require('axios');

// Função para gerar um e-mail aleatório único
const generateUniqueEmail = (existingEmails) => {
  let email;
  do {
    const randomString = Math.random().toString(36).substring(2, 15);
    email = `${randomString}@example.com`;
  } while (existingEmails.has(email));
  existingEmails.add(email);
  return email;
};

// Função para gerar um nome aleatório único
const generateUniqueName = (existingNames) => {
  const firstNames = [
    'Alice', 'Bob', 'Charlie', 'Daisy', 'Eve', 'Frank', 'Grace', 'Hannah', 'Ivy', 'Jack',
    'Kathy', 'Liam', 'Mona', 'Nina', 'Oscar', 'Paul', 'Quinn', 'Rita', 'Sam', 'Tina',
    'Ursula', 'Victor', 'Wendy', 'Xander', 'Yara', 'Zane'
  ];

  const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor',
    'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 'Thompson', 'Garcia', 'Martinez', 'Robinson'
  ];

  let name;
  do {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    name = `${firstName} ${lastName}`;
  } while (existingNames.has(name));
  existingNames.add(name);
  return name;
};

// Função para criar um usuário com e-mail e nome aleatório
const createUser = async (name, email) => {
  try {
    const response = await axios.post('https://genesispay-pub-sample.bs0y0v.easypanel.host/api/users/new', {
      name,
      email
    });
    console.log(`Usuário criado com e-mail ${email} e nome ${name}:`, response.data);
    return { name, email };
  } catch (error) {
    console.error(`Erro ao criar usuário com e-mail ${email} e nome ${name}:`, error.response ? error.response.data : error.message);
    return null;
  }
};

// Função para criar um post com conteúdo aleatório
const createPost = async (name, email) => {
  try {
    const response = await axios.post('https://genesispay-pub-sample.bs0y0v.easypanel.host/api/users/new', {
      name,
      email,
      content: `Este é um post de ${name} com o e-mail ${email}`
    });
    console.log(`Post criado por ${name} com e-mail ${email}:`, response.data);
  } catch (error) {
    console.error(`Erro ao criar post por ${name} com e-mail ${email}:`, error.response ? error.response.data : error.message);
  }
};

// Função principal para criar 20 mil usuários únicos e fazer posts
const main = async () => {
  const numberOfUsers = 20000; // Número de usuários a serem criados
  const batchSize = 100; // Número de usuários por lote
  const existingEmails = new Set();
  const existingNames = new Set();

  for (let i = 0; i < numberOfUsers; i += batchSize) {
    const promises = [];
    for (let j = 0; j < batchSize && i + j < numberOfUsers; j++) {
      const name = generateUniqueName(existingNames);
      const email = generateUniqueEmail(existingEmails);
      promises.push(createUser(name, email));
    }

    const users = await Promise.all(promises); // Espera todas as promessas do lote atual serem resolvidas

    const postPromises = users.map(user => {
      if (user) {
        return createPost(user.name, user.email);
      }
      return Promise.resolve();
    });

    await Promise.all(postPromises); // Espera todas as promessas de post do lote atual serem resolvidas
  }
};

main();
