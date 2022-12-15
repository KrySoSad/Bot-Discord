const Discord = require('discord.js');

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('staff')
        .setDescription('Các lệnh của staff')
        .addSubcommand((subcommand) => 
        subcommand
            .setName('kick')
            .setDescription('kick một người')
            .addUserOption(option => 
            option
                .setName('tên')
                .setDescription('Tên người muốn kick')
                .setRequired(true)
            )
            .addStringOption(option => 
            option
                .setName('lý_do')
                .setDescription('Lý do muốn kick người đó')
                .setRequired(true)
            )
        
        )
        .addSubcommand((subcommand) => 
        subcommand
            .setName('ban')
            .setDescription('ban một người')
            .addUserOption(option => 
            option
                .setName('tên')
                .setDescription('Tên người muốn ban')
                .setRequired(true)
            )
            .addStringOption(option => 
            option
                .setName('lý_do')
                .setDescription('Lý do muốn ban người đó')
                .setRequired(true)
            )
        
        ),
        /**
         * 
         * @param {Discord.ChatInputCommandInteraction} interaction
         */
    async execute(interaction) {
        const {guild , options} = interaction;

        if (options.getSubcommand() === 'kick' ) {
            if(!interaction.memberPermissions.has(Discord.PermissionFlagsBits.KickMembers)) return interaction.reply({
                content: 'Bạn ko có quyền!',
                ephemeral: true
            })
            const user = interaction.options.getUser('tên');
            const reason = interaction.options.getString('lý_do')

            let target = interaction.guild.members.cache.get(user.id)
            target;

            if (target.kickable) {
                target.send({
                    embeds : [new Discord.EmbedBuilder()
                        .setTitle('Kick')
                        .setDescription(`
                            > **Server :** ${interaction.guild.name}

                            > **Tên :** ${user.username}

                            > **Id :** ${user.id}

                            > **Lý do :** ${reason}
                        `)
                    ]
                }).then(() => {
                    target.kick({ reason })
                }).then(() => {
                    interaction.reply({
                        embeds : [new Discord.EmbedBuilder()
                            .setTitle('**Đã kick thành công !**')
                            .setDescription(`
                                > **Server :** ${interaction.guild.name}
    
                                > **Tên :** ${user.username}
    
                                > **Id :** ${user.id}
    
                                > **Lý do :** ${reason}
                            `)
                        ]
                    })
                })
            } else {
                interaction.reply({
                    content: 'Không tìm thấy **tên/id** người dùng!',
                    ephemeral: true
                })
            }
        }
    }
}